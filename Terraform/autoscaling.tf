resource "aws_autoscaling_group" "autoscaling-asp" {
  name                      = "tf-autoscaling-asp"
  max_size                  = 1
  min_size                  = 1
  health_check_grace_period = 700
  health_check_type         = "ELB"
  desired_capacity          = 1
  force_delete              = false
  launch_configuration      = aws_launch_configuration.launch-conf-asp.name
  vpc_zone_identifier       = [ aws_subnet.subnet-public-1.id ]
  load_balancers            = [ aws_elb.loadbalancer-asp.name ]
  default_cooldown = 700

  timeouts {
    delete = "20m"
  }
}