import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type Position = {
    #assistantProfessor;
    #associateProfessor;
    #professor;
  };

  type JobListing = {
    id : Text;
    institute : Text;
    position : Position;
    department : Text;
    location : Text;
    deadline : Text;
    applyUrl : Text;
  };

  var nextId = 1;
  let jobListings = List.empty<JobListing>();

  module JobListing {
    public func compareByInstitute(a : JobListing, b : JobListing) : Order.Order {
      Text.compare(a.institute, b.institute);
    };
  };

  // Seed data
  public shared ({ caller }) func init() : async () {
    if (jobListings.size() == 0) {
      jobListings.addAll([
        {
          id = "job1";
          institute = "IIT Bombay";
          position = #assistantProfessor;
          department = "Computer Science";
          location = "Mumbai";
          deadline = "2024-08-31";
          applyUrl = "https://www.iitb.ac.in/facultypositions";
        },
        {
          id = "job2";
          institute = "IISc Bangalore";
          position = #associateProfessor;
          department = "Chemistry";
          location = "Bangalore";
          deadline = "2024-09-15";
          applyUrl = "https://www.iisc.ac.in/faculty-positions";
        },
        {
          id = "job3";
          institute = "IIT Delhi";
          position = #professor;
          department = "Electrical Engineering";
          location = "Delhi";
          deadline = "2024-10-01";
          applyUrl = "https://www.iitd.ac.in/facultyjobs";
        },
        {
          id = "job4";
          institute = "IIT Bombay";
          position = #assistantProfessor;
          department = "Mechanical Engineering";
          location = "Mumbai";
          deadline = "2024-09-10";
          applyUrl = "https://www.iitb.ac.in/facultypositions";
        },
        {
          id = "job5";
          institute = "IIT Bombay";
          position = #associateProfessor;
          department = "Electrical Engineering";
          location = "Mumbai";
          deadline = "2024-12-31";
          applyUrl = "https://www.iitb.ac.in/facultypositions";
        },
        {
          id = "job6";
          institute = "IIT Madras";
          position = #professor;
          department = "Electrical Engineering";
          location = "Chennai";
          deadline = "2024-11-30";
          applyUrl = "https://facapp.iitm.ac.in/";
        },
        {
          id = "job7";
          institute = "IIT Delhi";
          position = #professor;
          department = "Computer Science";
          location = "Delhi";
          deadline = "2025-01-31";
          applyUrl = "https://www.iitd.ac.in/facultyjobs";
        },
        {
          id = "job8";
          institute = "IISc Bangalore";
          position = #assistantProfessor;
          department = "Electrical Engineering";
          location = "Bangalore";
          deadline = "2024-08-15";
          applyUrl = "https://www.iisc.ac.in/faculty-positions";
        },
        {
          id = "job9";
          institute = "IIT Delhi";
          position = #assistantProfessor;
          department = "Chemistry";
          location = "Delhi";
          deadline = "2024-11-15";
          applyUrl = "https://www.iitd.ac.in/facultyjobs";
        },
        {
          id = "job10";
          institute = "IIT Bombay";
          position = #professor;
          department = "Chemistry";
          location = "Mumbai";
          deadline = "2024-10-31";
          applyUrl = "https://www.iitb.ac.in/facultypositions";
        },
      ].values());
    };
  };

  // Add job listing
  public shared ({ caller }) func addJob(institute : Text, position : Position, department : Text, location : Text, deadline : Text, applyUrl : Text) : async Text {
    let newId = "job" # nextId.toText();
    let newJob : JobListing = {
      id = newId;
      institute;
      position;
      department;
      location;
      deadline;
      applyUrl;
    };
    jobListings.add(newJob);
    nextId += 1;
    newId;
  };

  // Edit job listing
  public shared ({ caller }) func editJob(id : Text, institute : Text, position : Position, department : Text, location : Text, deadline : Text, applyUrl : Text) : async () {
    let updatedListings = jobListings.map<JobListing, JobListing>(
      func(job) {
        if (job.id == id) {
          {
            id;
            institute;
            position;
            department;
            location;
            deadline;
            applyUrl;
          };
        } else {
          job;
        };
      }
    );
    jobListings.clear();
    jobListings.addAll(updatedListings.values());
  };

  // Remove job listing
  public shared ({ caller }) func removeJob(id : Text) : async () {
    let filtered = jobListings.filter(
      func(job) { job.id != id }
    );
    if (filtered.size() == jobListings.size()) {
      Runtime.trap("Job not found");
    };
    jobListings.clear();
    jobListings.addAll(filtered.values());
  };

  // Query functions
  public query ({ caller }) func getAllJobs() : async [JobListing] {
    jobListings.toArray();
  };

  public query ({ caller }) func filterJobsByInstitute(institute : Text) : async [JobListing] {
    jobListings.filter(
      func(job) { Text.equal(job.institute, institute) }
    ).toArray();
  };

  public query ({ caller }) func filterJobsByDepartment(department : Text) : async [JobListing] {
    jobListings.filter(
      func(job) { Text.equal(job.department, department) }
    ).toArray();
  };

  public query ({ caller }) func filterJobsByLocation(location : Text) : async [JobListing] {
    jobListings.filter(
      func(job) { Text.equal(job.location, location) }
    ).toArray();
  };

  public query ({ caller }) func filterJobsByPosition(position : Position) : async [JobListing] {
    jobListings.filter(
      func(job) { job.position == position }
    ).toArray();
  };

  public query ({ caller }) func searchJobs(searchTerm : Text) : async [JobListing] {
    let lowerSearchTerm = searchTerm.toLower();
    jobListings.filter(
      func(job) {
        job.institute.toLower().contains(#text lowerSearchTerm) or
        job.department.toLower().contains(#text lowerSearchTerm);
      }
    ).toArray();
  };
};
