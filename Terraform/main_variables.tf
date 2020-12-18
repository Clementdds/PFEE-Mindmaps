variable "region" {
    default = "us-east-1"
}

variable "availability_zone" {
    default = [ "us-east-1a", "us-east-1b" ]
}

variable "database_name" {
    default = "postgres"
}

variable "database_admin_username" {
    default = "postgres"
}

variable "database_admin_password" {
    default = "SFzenbzvui1234"
}