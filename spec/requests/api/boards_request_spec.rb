require 'rails_helper'

RSpec.describe "Api::Boards", type: :request do

  describe 'Get Start' do
    before {get '/api/start'}

    it "gets a new game" do
      expect(JSON.parse(response.body).size).to eq(2)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end

    it 'has game id' do
      expect(JSON.parse(response.body)['id']).to be_a_kind_of(Integer)
    end

    it 'has boogle string for the game' do
      expect(JSON.parse(response.body)['boogle_string']).to be_a_kind_of(String)
    end

    it 'has boogle string of length 16' do
      expect(JSON.parse(response.body)['boogle_string'].size).to eq(16)
    end

  end

  describe 'Get Score' do
    it "does not get score for less than 3 character word" do
      game_index = 1
      boogle_string = BOOGLE_STRINGS.at(game_index)

      get '/api/score', params: {
          :id  => game_index,
          :word => boogle_string.chars.sample(2).join
      }

      expect(JSON.parse(response.body)['score']).to eq(0)

      get '/api/score', params: {
          :id  => game_index,
          :word => ""
      }

      expect(JSON.parse(response.body)['score']).to eq(0)

    end


    it "gets score of 1 for valid 3 character word" do
      game_index = 1 #dkooctsriwlgrgwn

      get '/api/score', params: {
          :id  => game_index,
          :word => "wit"
      }

      expect(JSON.parse(response.body)['score']).to eq(1)
    end

    it "gets score of 1 for valid 4 character word" do
      game_index = 1 #dkooctsriwlgrgwn

      get '/api/score', params: {
          :id  => game_index,
          :word => "root"
      }

      expect(JSON.parse(response.body)['score']).to eq(1)
    end

    it "gets score of 1 for valid 5 character word" do
      game_index = 0 #bsttrafrhwleoedm

      get '/api/score', params: {
          :id  => game_index,
          :word => "wafer"
      }

      expect(JSON.parse(response.body)['score']).to eq(2)
    end

    it "does not get score for valid characters whose corresponding word is not in dictionary" do
      game_index = 0 #bsttrafrhwleoedm

      get '/api/score', params: {
          :id  => game_index,
          :word => "bstt"
      }

      expect(JSON.parse(response.body)['score']).to eq(0)
    end


  end

end
