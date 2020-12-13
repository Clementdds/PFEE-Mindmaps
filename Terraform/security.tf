//ASP WEBSITE
resource "aws_security_group" "ec2" {
    vpc_id = aws_vpc.vpc.id
    
    egress {
        from_port = 0
        to_port = 0
        protocol = -1
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 5000
        to_port = 5000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

//DB
resource "aws_security_group" "db" {

    vpc_id = aws_vpc.vpc.id
    
    egress {
        from_port = 0
        to_port = 0
        protocol = -1
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        protocol = "tcp"
        security_groups = [ aws_security_group.ec2.id ]
        from_port = 5432
        to_port = 5432
    }

    ingress {
        protocol = "tcp"
        cidr_blocks = [ aws_vpc.vpc.cidr_block ] //inbound
        from_port = 5432
        to_port = 5432
    }
}