drop database ucms_proj;
create database ucms_proj;
use ucms_proj;

CREATE TABLE Users (    
	UserID VARCHAR(255) PRIMARY KEY ,    
	ClubName varchar(255) default NULL,
    ClubDepartment ENUM('CSE','Misc.','AIML') default null,
	Username VARCHAR(255) NOT NULL,    
	Password VARCHAR(255) NOT NULL,    
	Role ENUM('Admin', 'ClubHead', 'CoreMember') NOT NULL
);

CREATE TABLE Clubs (
    ClubID VARCHAR(255)  ,
--     UserID VARCHAR(255) default NULL,
--     foreign key(UserID) references Users(UserID),
    ClubName VARCHAR(255) NOT NULL unique,
    Dept ENUM('CSE','Misc.','AIML'),
    primary key(ClubID,ClubName)
    );
    
Alter table users add foreign key (ClubName) references clubs(ClubName) on delete cascade;
CREATE TABLE UserClub (
    UserID VARCHAR(255),
    ClubID VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ClubID) REFERENCES Clubs(ClubID),
    PRIMARY KEY (UserID, ClubID)
);

CREATE TABLE Events (
    EventID VARCHAR(255) PRIMARY KEY,
    ClubName VARCHAR(255),
    EventName VARCHAR(255) NOT NULL,
    Venue VARCHAR(255),
    Date DATE,
    Budget DECIMAL(10,2),
    PrizeMoney DECIMAL(10,2),
    FOREIGN KEY (ClubName) REFERENCES Clubs(ClubName)
);

CREATE TABLE Domain(
	DomainID VARCHAR(255) NOT NULL,
    DomainName VARCHAR(255),
    ClubID VARCHAR(255),
    DomainHead VARCHAR(255),
    FOREIGN KEY (ClubID) REFERENCES Clubs(ClubID),
    PRIMARY KEY (DomainID, ClubID)
);

CREATE TABLE Members(
	MemberID VARCHAR(255) NOT NULL,
    MemberName VARCHAR(255),
    ClubID VARCHAR(255),
    DomainID VARCHAR(255),
    SRN VARCHAR(20),
    FOREIGN KEY (ClubID) REFERENCES Clubs(ClubID),
    FOREIGN KEY (DomainID) REFERENCES Domain(DomainID)
);