variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "AWS CLI profile name to use for authentication."
  type        = string
  default     = "default"
}

variable "tags" {
  description = "Tags to apply to all taggable AWS resources via provider default_tags."
  type        = map(string)
  default = {
    project     = "devopspractices"
    environment = "dev"
    managed_by  = "opentofu"
  }
}
