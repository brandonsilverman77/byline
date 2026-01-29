class FeedsController < ApplicationController
  # before_action :validate_superadmin
  
  # def create 
  #   feed = Feed.new feed_params
  # 
  #   respond_to do |f|
  #     f.json {
  #       render json: feed.validate_and_save
  #     }
  #   end
  # 
  # end
  
  private 
  
  def feed_params
    params.require(:feed).permit(:url)
  end
end
