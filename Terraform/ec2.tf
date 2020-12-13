resource "aws_instance" "db1" { //MUST RENAME
  security_groups = [ aws_security_group.ec2.id ]
  ami             = "ami-0885b1f6bd170450c"
  instance_type   = "t2.micro"
  key_name        = "admin"
  subnet_id = aws_subnet.subnet-public-1.id
}