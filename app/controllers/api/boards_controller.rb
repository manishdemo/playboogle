module Api
class BoardsController < ApplicationController

  def start
    boogle_strings = ["bsttrafrhwleoedm",
                       "dkooctsriwlgrgwn",
                       "rsikueszrerraawm",
                       "atpelueithvoiohm",
                       "eoireoneyrtysrsm"
    ]

    game_index = rand (0 ..  boogle_strings.length-1)

    render(
        json: {
            id: game_index,
            boogle_string: boogle_strings.at(game_index)
        }
    )
  end
end

end
