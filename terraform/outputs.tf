output "aws_account_id" {
  description = "AWS Account ID executing this deployment."
  value       = data.aws_caller_identity.current.account_id
}

output "aws_region" {
  description = "AWS region executing this deployment."
  value       = data.aws_region.current.name
}
