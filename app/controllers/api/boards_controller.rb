module Api

include ApplicationHelper

class BoardsController < ApplicationController
  include Scoring

  def start
    game_index = rand (0 ..  BOOGLE_STRINGS.length-1)

    render(
        json: {
            id: game_index,
            boogle_string: BOOGLE_STRINGS.at(game_index)
        }
    )
  end

  def score
    game_id = params[:id].to_i
    submitted_word = params[:word]

    # get_score
    # puts("game id = #{game_id} ")

    # TODO: add real logic for scoring.
    score =  get_score(submitted_word, game_id)
    render(
        json: {
            score: score
        }
    )
  end
end

end
