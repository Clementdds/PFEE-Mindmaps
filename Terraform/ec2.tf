resource "aws_instance" "db1" {
  security_groups = [ aws_security_group.ec2.id ]
  ami             = "ami-096fda3c22c1c990a"
  instance_type   = "t2.micro"
  key_name        = "admin"
  subnet_id = aws_subnet.subnet-public-1.id
  user_data = file("master.sh")
}