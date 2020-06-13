# @author Manish Shrestha (manishshrestha2006 at gmail dot com)

module Scoring
  extend ActiveSupport::Concern

  MIN_WORD_LENGTH = 3
  MAX_WORD_LENGTH = 15
  BOOGLE_BOARD_WIDTH = 4

  ## Determines the score for the given word in the given game.
  #
  # @param [String] submitted_word The word submitted by the user.
  # @param [Integer] game_id The id of the boogle game.
  # @return [Integer] Returns score for the submitted word in the game. Returns 0 if any error or anything invalid.
  def get_score(submitted_word, game_id)
    return 0 unless is_valid_word(submitted_word)

    submitted_word = submitted_word.downcase
    submitted_word_length = submitted_word.length

    return 0 unless is_valid_path(submitted_word, game_id)

    (submitted_word_length > (MIN_WORD_LENGTH+1)) ? (submitted_word_length - MIN_WORD_LENGTH): 1
  end

  #private

  ## Performs basic validation like check for length of the word and the presence of non-alphabets.
  #
  # @param [String] word The word to be validated
  # @return [Boolean] Returns true if basic validations is passed by the word
  def is_valid_word(word)
    # check if length of the word is enough
    return false if (word.length < MIN_WORD_LENGTH or word.length > MAX_WORD_LENGTH)

    #check if the characters are all alphabets
    if  word[/[a-zA-Z]+/]  != word
      puts("Contains more than alphabets: #{word}")
      return false
    end

    true
  end

  ## Determines if the submitted word can be formed from the game string using valid moves
  #
  # @param [String] submitted_word The input word submitted by user.
  # @param [Integer] game_id The id of the boogle game.
  # @return [Boolean] Return  true if the the submitted word can be formed from the game string using valid moves
  def is_valid_path(submitted_word, game_id)
    possible_paths = []
    boogle_string = BOOGLE_STRINGS.at(game_id)

    # puts("boogle_string = #{boogle_string}")
    # puts("submitted_word = #{submitted_word}")

    submitted_word.split('').each { |ch|
      char_locations = get_char_positions(boogle_string, ch)
      return false if char_locations.length == 0

      # puts("before call. possible path: #{possible_paths}. char= #{ch} char_locations: #{char_locations}")
      possible_paths = get_next_allowed_paths(possible_paths, char_locations)
      # puts("after call. possible path: #{possible_paths}.")

      return false  if (possible_paths.length == 0)
    }

    possible_paths.length > 0
  end

  ## Finds location of the provided character in the given string.
  #
  # @param [String] str_to_scan_on  The string in which to scan for the character.
  # @param [Char] char_to_scan The character to scan in the string.
  # @return [Array]  Returns array of positions of the provided character.
  def get_char_positions(str_to_scan_on, char_to_scan)
    detected_positions = []
    search_pos = 0

    while (first_char_pos = str_to_scan_on.index(char_to_scan, search_pos)) != nil do
      detected_positions.append(first_char_pos)
      search_pos = first_char_pos + 1
    end

    detected_positions
  end

  ## Determines the next valid paths/moves, when the given locations of a character, are to be appended to the
  # existing valid paths.
  #
  # @param [Array<Array>] current_paths The array of existing valid paths. Each path is an array of the valid locations
  #     in the path.
  # @param [Array] char_locations Array of the locations of the next character to be evaluated.
  # @return [Array<Array>] Returns a new array of next valid paths, when the provided character location is added to
  #   given paths.
  def get_next_allowed_paths(current_paths, char_locations)
    next_possible_paths = Array.new
    # initialize with the location of the 1st character
    if current_paths.length == 0
      char_locations.each { |char_location|
        next_possible_paths.append([char_location])
      }
      return next_possible_paths
    end

    #if the char location is in adjacent cell of the last cell of a possible_path, include in the path
    current_paths.each { |current_path|
      end_pos_of_path = current_path[-1]
      char_locations.each { |char_location|
        if not current_path.include? char_location
          if is_adjacent_cell(end_pos_of_path, char_location, BOOGLE_BOARD_WIDTH)
            next_possible_paths.append(current_path + [char_location])
          end
        end
      }
    }

    next_possible_paths
  end

  ## Finds if the given two characters lie next to each other in the given board size.
  #
  # @param [Integer] first_char_loc Location of a character in the board
  # @param [Integer] next_char_loc Location of the next character in the board, that needs to be compared
  # @param [Integer] board_width The width of the Boogle board.
  # @return [Boolean] Returns true if the given two characters lie next to each other in the given board size
  def is_adjacent_cell(first_char_loc, next_char_loc, board_width)
    # if same locations, they are not adjacent
    return false if first_char_loc == next_char_loc

    col_1st = first_char_loc%board_width
    row_1st = first_char_loc/board_width
    col_2nd = next_char_loc%board_width
    row_2nd = next_char_loc/board_width

    #if the col or row location difference is not greater than 1 , they are adjacent
    ((col_1st-col_2nd).abs <=1 and (row_1st-row_2nd).abs <=1)
  end

end
