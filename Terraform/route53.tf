resource "aws_route53_zone" "sante" {
  name = var.aws_route53_zone_name
}

resource "aws_route53_record" "elb" {
  zone_id = aws_route53_zone.sante.zone_id
  name    = var.aws_route53_record_elb_name
  type    = "A"

  alias {
    name                   = aws_elb.loadbalancer-asp.dns_name
    zone_id                = aws_elb.loadbalancer-asp.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "ns" {
  allow_overwrite = true
  name            = var.aws_route53_zone_name
  ttl             = 30
  type            = "NS"
  zone_id         = aws_route53_zone.sante.zone_id

  records = var.aws_route53_record_ns_records
}

output "aws_route_elb" {
  value       = aws_route53_record.elb.name
  description = "The domain name"
}