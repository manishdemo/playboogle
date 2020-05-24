module Api
class BoardsController < ApplicationController
  def start
    render(
        json: {
            id: 1,
            boogle_string: "bsttrafrhwleoedm"
        }
    )
  end
end

end
