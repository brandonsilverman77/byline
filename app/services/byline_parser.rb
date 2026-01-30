# frozen_string_literal: true

# Service to parse compound bylines into individual author names
#
# Examples:
#   BylineParser.parse("MIKE ISAAC and KATE CONGER")
#   # => ["Mike Isaac", "Kate Conger"]
#
#   BylineParser.parse("John Smith, Jane Doe, and Bob Wilson")
#   # => ["John Smith", "Jane Doe", "Bob Wilson"]
#
#   BylineParser.parse("By AARON BLAKE")
#   # => ["Aaron Blake"]
#
class BylineParser
  # Common patterns to strip from the beginning of bylines
  BYLINE_PREFIXES = /\A(by\s+|written\s+by\s+|from\s+|reporter[s]?\s+)/i

  # Patterns that indicate multiple authors
  SPLIT_PATTERNS = [
    /\s+and\s+/i,           # " and "
    /\s*&\s*/,              # " & "
    /,\s+and\s+/i,          # ", and " (Oxford comma)
    /\s*,\s*/               # ", " (but handled carefully)
  ]

  # Suffixes that indicate a name continues (don't split on comma before these)
  NAME_SUFFIXES = %w[Jr Sr II III IV PhD MD JD Esq].freeze

  class << self
    # Parse a byline string into an array of individual author names
    #
    # @param byline [String] The raw byline string
    # @return [Array<String>] Array of individual author names, normalized
    def parse(byline)
      return [] if byline.nil? || byline.strip.empty?

      # Clean up the byline
      cleaned = clean_byline(byline)
      return [] if cleaned.empty?

      # Split into individual names
      names = split_names(cleaned)

      # Normalize each name and remove blanks
      names.map { |name| normalize_name(name) }.compact.reject(&:empty?).uniq
    end

    private

    # Remove common prefixes and clean up whitespace
    def clean_byline(byline)
      result = byline.to_s.strip

      # Remove "By " and similar prefixes
      result = result.gsub(BYLINE_PREFIXES, '')

      # Remove common suffixes like "for The New York Times"
      result = result.gsub(/\s+(for|of|at)\s+.*$/i, '')

      # Remove content in parentheses (often contains publication info)
      result = result.gsub(/\s*\([^)]*\)\s*/, ' ')

      # Remove email addresses
      result = result.gsub(/\S+@\S+\.\S+/, '')

      # Normalize whitespace
      result.gsub(/\s+/, ' ').strip
    end

    # Split a cleaned byline into individual names
    def split_names(byline)
      # First, replace " and " and " & " with a unique delimiter
      # This handles "John and Jane" as well as "John, Jane, and Bob"
      working = byline.gsub(/,?\s+and\s+/i, '|||')
      working = working.gsub(/\s*&\s*/, '|||')

      # Now split on commas, but be careful about name suffixes
      parts = smart_comma_split(working)

      # Split any remaining compound names on our delimiter
      parts.flat_map { |part| part.split('|||') }
    end

    # Split on commas while preserving name suffixes like "Jr." or "III"
    def smart_comma_split(text)
      # Simple approach: split on comma, then rejoin if next part is a suffix
      raw_parts = text.split(/\s*,\s*/)

      result = []
      i = 0

      while i < raw_parts.length
        current = raw_parts[i].strip

        # Check if the next part is a suffix that should be joined
        if i + 1 < raw_parts.length
          next_part = raw_parts[i + 1].strip
          if NAME_SUFFIXES.any? { |suffix| next_part.casecmp(suffix).zero? || next_part.casecmp("#{suffix}.").zero? }
            current = "#{current}, #{next_part}"
            i += 1
          end
        end

        result << current unless current.empty?
        i += 1
      end

      result
    end

    # Normalize a single author name to title case
    def normalize_name(name)
      return '' if name.nil?

      # Clean up the name
      cleaned = name.strip

      # Remove any remaining special characters at start/end
      cleaned = cleaned.gsub(/\A[^a-zA-Z]+/, '').gsub(/[^a-zA-Z.]+\z/, '')

      return '' if cleaned.empty?

      # Convert to title case, handling special cases
      title_case(cleaned)
    end

    # Convert a name to title case with special handling
    def title_case(name)
      # Split into words
      words = name.split(/\s+/)

      words.map.with_index do |word, index|
        # Handle hyphenated names
        if word.include?('-')
          word.split('-').map { |part| capitalize_name_part(part) }.join('-')
        # Handle ALL CAPS names
        elsif word == word.upcase && word.length > 1
          capitalize_name_part(word)
        # Handle already mixed case (preserve if it looks intentional)
        elsif word =~ /[a-z]/ && word =~ /[A-Z]/
          # Likely intentional mixed case like "McDonald" or "DeVito"
          word
        else
          capitalize_name_part(word)
        end
      end.join(' ')
    end

    # Capitalize a single part of a name
    def capitalize_name_part(part)
      return part if part.length <= 1

      # Handle common prefixes that should stay lowercase
      lower_prefixes = %w[van von de la le du]
      if lower_prefixes.include?(part.downcase)
        return part.downcase
      end

      # Handle Irish/Scottish names
      if part.downcase.start_with?('mc')
        return 'Mc' + part[2..].capitalize
      end
      if part.downcase.start_with?("o'")
        return "O'" + part[2..].capitalize
      end
      if part.downcase.start_with?('mac') && part.length > 4
        return 'Mac' + part[3..].capitalize
      end

      # Standard capitalization
      part.capitalize
    end
  end
end
