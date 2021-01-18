resource "aws_elb" "loadbalancer-asp" {
  name    = "tf-loadbalancer-asp"
  subnets = [ aws_subnet.subnet-public-1.id ]

  security_groups = [ aws_security_group.ec2.id ]

  listener {
    instance_port     = 3000
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 3
    unhealthy_threshold = 5
    timeout             = 3
    target              = "HTTP:3000/"
    interval            = 30
  }

  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400
}

output "elb_dns_name" {
  value       = aws_elb.loadbalancer-asp.dns_name
  description = "The domain name of the load balancer"
}