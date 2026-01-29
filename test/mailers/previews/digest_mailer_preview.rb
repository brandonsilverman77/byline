class DigestMailerPreview < ActionMailer::Preview
  def digest_email
    DigestMailer.with(user_id: User.first.id).test_digest_email
  end
  
  def test_digest_email
    DigestMailer.with(user_id: User.first.id).test_digest_email
  end
end