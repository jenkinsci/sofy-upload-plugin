go
create database test;
go
use test;
create login test with password='P@ssword';
create user test for login test;
grant control to test;
