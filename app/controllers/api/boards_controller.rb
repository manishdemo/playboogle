module Api

include ApplicationHelper

class BoardsController < ApplicationController

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
    game_id = params[:id]
    word = params[:word]

    # TODO: add real logic for scoring.
    render(
        json: {
            score: 3
        }
    )
  end
end

end
