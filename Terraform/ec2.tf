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

resource "aws_instance" "site" {
  security_groups = [ aws_security_group.ec2.id ]
  ami             = "ami-0885b1f6bd170450c"
  instance_type   = "t2.micro"
  key_name        = "admin"
  subnet_id = aws_subnet.subnet-public-1.id
  user_data = data.template_file.init_website.rendered 
}

output rds_endpoint {
  value       = aws_db_instance.postgres.endpoint
  description = "rds endpoint"
  depends_on  = [ aws_instance.site ]
}

output rds_password {
  value       = var.database_admin_password
  description = "rds password"
  depends_on  = [ aws_instance.site ]
}

output rds_dbname {
  value       = var.database_name
  description = "rds dbname"
  depends_on  = [ aws_instance.site ]
}

output rds_database_admin_username {
  value       = var.database_admin_username
  description = "rds db admin username"
  depends_on  = [ aws_instance.site ]
}
