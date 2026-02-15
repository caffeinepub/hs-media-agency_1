import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  type PhoneNumber = {
    countryCode : Text;
    number : Text;
  };

  type ServiceInterest = {
    #digitalMarketing;
    #mediaProduction;
    #publicRelations;
    #eventManagement;
    #influencerMarketing;
    #contentCreation;
    #strategyConsulting;
    #other;
  };

  type Inquiry = {
    id : Nat;
    fullName : Text;
    email : Text;
    phone : ?PhoneNumber;
    serviceInterest : ServiceInterest;
    message : Text;
    consentGiven : Bool;
    timestamp : Time.Time;
    submittedBy : Principal;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Nat.compare(inquiry1.id, inquiry2.id);
    };
  };

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 0;

  public shared ({ caller }) func submitInquiry(
    fullName : Text,
    email : Text,
    phone : ?PhoneNumber,
    serviceInterest : ServiceInterest,
    message : Text,
    consentGiven : Bool,
  ) : async () {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      fullName;
      email;
      phone;
      serviceInterest;
      message;
      consentGiven;
      timestamp = Time.now();
      submittedBy = caller;
    };

    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  public query ({ caller }) func getInquiry(id : Nat) : async Inquiry {
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) { inquiry };
    };
  };

  public query ({ caller }) func listInquiries() : async [Inquiry] {
    let iter = inquiries.values();
    iter.toArray().sort();
  };
};
