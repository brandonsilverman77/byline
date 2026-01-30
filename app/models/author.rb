class Author < ApplicationRecord
  
  has_many :author_articles
  has_many :articles, through: :author_articles
  
  has_many :user_authors
  has_many :users, through: :user_authors
  
  has_many :author_categories
  has_many :categories, through: :author_categories
  
  
  def self.from item 
    if item.author
      names = self.clean_names item.author.name

      authors = names.collect do |name|
        author = self.find_by name: name
        
        if !author
          author = Author.new name: name
          author.save
        end
        
        author
      end
    
      authors
    else 
      []
    end        
  end
  
  def self.search(params)
    search_term = params[:search]
    category_ids = params[:categories]
    has_search = search_term && search_term.length > 0
    has_categories = !category_ids.nil? && !category_ids.empty?
    if !has_search && !has_categories
      self.featured
    else
      if has_search
        relation = self.where('name ILIKE ?', "%#{params[:search]}%")
      end 
      
      if has_categories
        if !relation 
          relation = self
        end
        relation = relation
          .joins(:author_categories)
          .joins(:categories)
          .where("categories.id IN (?)", category_ids)
      end
      
      relation.group(:id).order(twitter_id: :asc)
    end
  end
  
  def to_s 
    "#{self.name}"
  end
  
  def self.featured
    where(featured: true)
  end

  # Name aliases for matching variations of author names
  # Maps normalized alias -> normalized canonical name (the featured author's name)
  # Note: We map short names to long names since articles tend to use full names
  NAME_ALIASES = {
    # Matt -> Matthew (articles use "Matthew Yglesias")
    'matt yglesias' => 'matthew yglesias',
    # Heather Richardson -> Heather Cox Richardson (articles use full name)
    'heather richardson' => 'heather cox richardson',
  }.freeze

  # Normalize a name for comparison (lowercase, single spaces)
  def self.normalize_name(name)
    name.to_s.strip.downcase.gsub(/\s+/, ' ')
  end

  # Find a featured author that matches the given name (case-insensitive)
  # Also checks aliases for common name variations
  # Returns nil if no match found
  def self.find_featured_match(name)
    return nil if name.blank?

    normalized_input = normalize_name(name)
    return nil if normalized_input.empty?

    # Build a list of names to try (original + any aliases)
    names_to_try = [normalized_input]

    # Check if this name is an alias for something else
    if NAME_ALIASES.key?(normalized_input)
      names_to_try << NAME_ALIASES[normalized_input]
    end

    # Also check reverse: if a featured author's name is an alias
    NAME_ALIASES.each do |alias_name, canonical_name|
      if canonical_name == normalized_input
        names_to_try << alias_name
      end
    end

    # Try to find a match for any of the name variations
    featured.find do |author|
      author_normalized = normalize_name(author.name)
      names_to_try.include?(author_normalized)
    end
  end

  # Find all featured authors that match any of the names in a byline
  # Uses BylineParser to split compound bylines
  def self.match_byline_to_featured(byline)
    return [] if byline.blank?

    # Parse the byline into individual names
    individual_names = BylineParser.parse(byline)

    # Find featured authors for each name
    matched_authors = []
    individual_names.each do |name|
      author = find_featured_match(name)
      matched_authors << author if author
    end

    matched_authors.uniq
  end
  
  def featured!
    self.featured = true
    save
  end
  
  def add_twitter_account url_or_username
    twitter = TwitterLib.new
    twitter_user = twitter.get_user url_or_username
    self.bio = twitter_user.description
    self.twitter_id = twitter_user.id
    self.twitter_handle = twitter_user.screen_name
    self.image_url = twitter_user.profile_image_uri_https.to_s
    self.twitter_profile_image_url = twitter_user.profile_banner_uri_https.to_s
    save
  end
  
  def domains 
    article_ids = articles.pluck(:id)
    Domain.joins(:articles).where(:articles => {:id => article_ids}).group(:id)
  end
  
  def toggle_subscribe!(user)
    logger.info "Toggle subscription! is subbed #{user.is_subscribed? to: self}"
    if user.nil?
      raise LoginError.new "The user must be logged in to do this action"
    elsif user.is_subscribed? to: self
      logger.info "unsubbing"
      self.user_authors.where(user: user).destroy_all
    else 
      logger.info "subbing"
      self.user_authors.create user: user
    end
    
  
    
  end
  
  def self.clean_names(str)
    if str.nil?
      return nil
    end
    
    ## strip "By";
    str.strip!
    str = str.gsub(/^[Bb]y\s/, '')
    
    match_data = str.scan /\(([\w\s]+)\)/
    if !match_data.empty?
      names = match_data.flatten
      return names
    end
        
    [str]
  end 
  
  private 
    
   
end
