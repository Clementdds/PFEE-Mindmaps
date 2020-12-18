resource "aws_db_subnet_group" "db_subnets_private_group" {
  name       = "tf_db_subnet_group"
  subnet_ids = [ aws_subnet.subnet-public-2.id, aws_subnet.subnet-public-3.id ]
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "9.6.19"
  instance_class       = "db.t3.micro"
  backup_retention_period = 2
  name                 = var.database_name
  username             = var.database_admin_username
  password             = var.database_admin_password
  multi_az             = false
  availability_zone    = aws_subnet.subnet-public-2.availability_zone
  vpc_security_group_ids = [ aws_security_group.db.id ]
  db_subnet_group_name = aws_db_subnet_group.db_subnets_private_group.name
  skip_final_snapshot = true
  deletion_protection = false
}

/*resource "aws_db_instance" "postgres_replicate" {
  depends_on = [ aws_db_instance.postgres ]

  replicate_source_db  = aws_db_instance.postgres.id
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "9.6.19"
  instance_class       = "db.t3.micro"
  name                 = var.database_name
  username             = var.database_admin_username
  multi_az             = false
  availability_zone    = aws_subnet.subnet-public-3.availability_zone
  vpc_security_group_ids = [ aws_security_group.db.id ]
  skip_final_snapshot = true
  deletion_protection = false   
}*/