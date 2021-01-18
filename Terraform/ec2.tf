data "template_file" "init_website" {
  template = file("run_site.sh")

  vars = {
    ip_db = aws_db_instance.postgres.endpoint,
    postgres_host = aws_db_instance.postgres.endpoint,
    postgres_password = var.database_admin_password,
    postgres_port = 5432,
    postgres_dbname = var.database_name,
    postgres_user = var.database_admin_username
    postgres_host_without_port = aws_db_instance.postgres.address
  }
}

resource "aws_launch_configuration" "launch-conf-asp" {
  name   = "tf-launch-config"
  image_id    = "ami-0885b1f6bd170450c"
  instance_type  = "t2.micro"
  user_data = data.template_file.init_website.rendered 
  key_name = "admin"

  security_groups = [ aws_security_group.ec2.id ]

  lifecycle {
    create_before_destroy = true
  }
}

output rds_endpoint {
  value       = aws_db_instance.postgres.endpoint
  description = "rds endpoint"
}

output rds_password {
  value       = var.database_admin_password
  description = "rds password"
}

output rds_dbname {
  value       = var.database_name
  description = "rds dbname"
}

output rds_database_admin_username {
  value       = var.database_admin_username
  description = "rds db admin username"
}
