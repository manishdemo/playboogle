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

  def verify(id)

  end
end

end
