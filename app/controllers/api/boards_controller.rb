module Api

include ApplicationHelper

class BoardsController < ApplicationController
  include Scoring

  ## API to start a new game. Returns the game id and the boogle string corresponding to
  # the game id.
  #
  def start
    game_index = rand (0 ..  BOOGLE_STRINGS.length-1)

    render(
        json: {
            id: game_index,
            boogle_string: BOOGLE_STRINGS.at(game_index)
        }
    )
  end

  ## API to return the score for the given word for the given game id
  #
  def score
    game_id = params[:id].to_i
    submitted_word = params[:word]

    # puts("game id = #{game_id} ")
    score =  get_score(submitted_word, game_id)
    render(
        json: {
            score: score
        }
    )
  end
end

end
