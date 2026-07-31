# Terraform (OpenTofu) Infrastructure

This repository contains OpenTofu/Terraform configuration for AWS infrastructure.

## Usage

1. Install OpenTofu: https://opentofu.org/
2. Initialize:
   - `tofu -chdir=terraform init`
3. Plan:
   - `tofu -chdir=terraform plan -var-file=environments/dev.tfvars`
4. Apply:
   - `tofu -chdir=terraform apply -var-file=environments/dev.tfvars`

## Structure

- `terraform/` - Root OpenTofu configuration
  - `providers.tf` - Provider configuration
  - `versions.tf` - Required provider versions
  - `main.tf` - Data sources and locals only (no module calls)
  - `variables.tf` - Variable declarations
  - `outputs.tf` - Output declarations
  - `environments/` - Environment-specific tfvars

> Note: Module discovery tools are disabled in this session, so this repo currently uses only minimal scaffolding. Add modules/resources as needed.
