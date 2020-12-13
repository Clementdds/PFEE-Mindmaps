/*VPC*/
resource "aws_vpc" "vpc" {

  cidr_block = "10.0.0.0/16"
  enable_dns_support = "true"
  enable_dns_hostnames = "true"
  enable_classiclink = "false"
  instance_tenancy = "default"
}

/*Internet GateWay*/
//IGW
resource "aws_internet_gateway" "igw" {

    vpc_id = aws_vpc.vpc.id
}

//Route table
resource "aws_route_table" "public-crt" {
    
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = "0.0.0.0/0" 
        gateway_id = aws_internet_gateway.igw.id
    }
}


/*SUBNET EC2*/
// Public route to IGW subnet 1 - EC2
resource "aws_route_table_association" "crta-public-subnet-1"{

    subnet_id = aws_subnet.subnet-public-1.id
    route_table_id = aws_route_table.public-crt.id
}

// Public subnet 1 - EC2
resource "aws_subnet" "subnet-public-1" {
    
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = var.availability_zone[0]
}



/*
    SUBNET RDS

N.B.: MUST use it with a security group that prevent connection from anywhere
*/

// Public route subnet 2 - RDS
resource "aws_route_table_association" "crta-public-subnet-2"{

    subnet_id = aws_subnet.subnet-public-2.id
    route_table_id = aws_route_table.public-crt.id
}

// Public route subnet 3 - RDS (replica)
resource "aws_route_table_association" "crta-public-subnet-3"{

    subnet_id = aws_subnet.subnet-public-3.id
    route_table_id = aws_route_table.public-crt.id
}

// Public subnet 2 - RDS
resource "aws_subnet" "subnet-public-2" {
    
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.0.2.0/24"
    map_public_ip_on_launch = "false" //doesn't need it
    availability_zone = var.availability_zone[0]
}

// Public subnet 3 - RDS (replica)
resource "aws_subnet" "subnet-public-3" {
    
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.0.3.0/24"
    map_public_ip_on_launch = "false" //doesn't need it
    availability_zone = var.availability_zone[1]
}