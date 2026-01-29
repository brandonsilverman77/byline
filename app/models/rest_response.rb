class RestResponse

  attr_accessor :status, :success, :error, :data
  
  def initialize(params = {})
    self.status = params[:status] || 200
    self.success = params[:success] || true
    self.error = params[:error] || nil
    self.data = params[:data] || nil
  end

end
