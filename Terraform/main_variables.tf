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

variable "aws_route53_zone_name" {
  default = "sante.epita.deliciousmuffins.net"
}

variable "aws_route53_record_elb_name" {
  default = "mindmap.sante.epita.deliciousmuffins.net"
}

variable "aws_route53_record_ns_records" {
    default = [
        "ns-1411.awsdns-48.org.",
        "ns-419.awsdns-52.com.",
        "ns-614.awsdns-12.net.",
        "ns-1891.awsdns-44.co.uk."
    ]
}