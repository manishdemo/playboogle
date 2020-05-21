require 'test_helper'

class BooglesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get boogles_index_url
    assert_response :success
  end

end
