var app=angular.module('contactmanagment_app',['contactmanagment_app.controllers','ngRoute'])
.config(function($routeProvider) {
  $routeProvider.when('/listcontact', {
    controller: 'contact_list_controller',
    templateUrl: './views/listcontact.html',
  }).when('/addcontact', {
    controller: 'create_contact_controller',
    templateUrl: './views/addcontact.html',
  });
  $routeProvider.otherwise({redirectTo:'/listcontact'});
});

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
})
.directive('ngConfirmClick', [
      function(){
          return {
              link: function (scope, element, attr) {
                  var msg = attr.ngConfirmClick || "Are you sure?";
                  var clickAction = attr.confirmedClick;
                  element.bind('click',function (event) {
                      if ( window.confirm(msg) ) {
                          scope.$eval(clickAction)
                      }
                  });
              }
          };
  }]);


/// Factory Services to access API's  
app.factory("passdata",function(){
        return {};
});
app.factory('api_service',function(){
    var factory ={};
    var baseurl='http://localhost:3000/contacts';
    var header={
                  "Content-Type": "application/json"
                }
    
    factory.createcontact=function($contactobj){
        var req={
                    method : "POST",
                    url :   baseurl,
                    headers: header,
                    data : $contactobj
                }
        return req;
    }
    factory.deletecontact=function($contactid){
        var localurl=baseurl+"/"+$contactid;
        var req={
                    method : "DELETE",
                    headers: header,
                    url :   localurl,
                }
        return req;
    }
    factory.updatecontact=function($contactobj){
        var req={
                    method : "PUT",
                    headers: header,
                    url :   baseurl,
                    data : $contactobj
                }
        return req;
    }
    factory.getcontacts=function(){
        var req={
                    method : "GET",
                    headers: header,
                    url :   baseurl
                }
        return req;
    }
    return factory;
});

angular.module('contactmanagment_app.controllers',[])
.controller('contact_list_controller',function($scope,$http,api_service,passdata){
    $scope.tab_title='List Contacts';
    $scope.refresh=function(){
        $http(api_service.getcontacts()).success(function($data){
            $scope.contact_list=$data;
        })
        .error(function(err){
          alert("Retrive Data failed");
        });
    };
    $scope.deletecontact=function($contact){
        $http(api_service.deletecontact($contact.Contact_Id)).success(function($data){
           alert("Contact "+$contact.Contact_Name+" Deleted Successfully");
           $http(api_service.getcontacts()).success(function($data){
                $scope.contact_list=$data;
            })
            .error(function(err){
              alert("Retrive Data failed");
            });
        })
        .error(function(err){
          alert("Data Deletion failed");
        });
    };
    $scope.addnewContact=function(){
      passdata.editcontact={};
      passdata.edit=false;
      $scope.contact=passdata.editcontact;
    }
    $scope.editcontact=function($contact){
      $contact.Contact_Mobile_No=parseInt($contact.Contact_Mobile_No);
      $scope.contact=passdata;
      $scope.contact.editcontact=$contact;
      $scope.contact.edit=true;
    }
})
.controller('create_contact_controller',function($scope,$http,api_service,passdata){
    $scope.error=false;
    $scope.tab_title='Add New Contact';
    $scope.contact=passdata.editcontact;
    $scope.edit=passdata.edit;
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.savecontact=function($contact){
      $scope.tab_title='Add New Contact';
          if($contact && ($contact.Contact_Name && ($contact.Contact_Mobile_No || $contact.Contact_Telephone_No) && $contact.Contact_Email && $contact.Contact_City ))
          {
              // alert(JSON.stringify(api_service.createcontact($contact)));
              $scope.error=false;
              $http(api_service.createcontact($contact)).success(function($data){
                  alert("Contact Saved Successfully !!");
                  $scope.contact='';  
                  window.location="./#/listcontact"
              })
              .error(function(err){
                alert("Data Could Not be Saved");
              });
          }
          else{
            $scope.error=true;
            if(!$contact)
            {
              $scope.errormessage="Contact Details are Invalid!";
            }
            else if(!$contact.Contact_Name)
            {
              $scope.errormessage="Contact Name is Required !";
            }
            else if(!$contact.Contact_Mobile_No && !$contact.Contact_Telephone_No)
            {
              $scope.errormessage="Contact Number is Invalid !";
            }
            else if(!$contact.Contact_Email){
              $scope.errormessage="Contact Email is Invalid !";
            }
            else{
              $scope.errormessage="City is Invalid !";
            }
          }
    }
    $scope.editcontact=function($contact){
        $scope.tab_title='Edit Contact';
            if($contact && ($contact.Contact_Name && ($contact.Contact_Mobile_No || $contact.Contact_Telephone_No) && $contact.Contact_Email && $contact.Contact_City ))
            { 
                // alert(JSON.stringify(api_service.updatecontact($contact)));
                $http(api_service.updatecontact($contact)).success(function($data){
                    $scope.contact='';  
                    alert("Contact Edited Successfully !!");
                    window.location="./#/listcontact"
                })
                .error(function(err){
                  alert("Data Updation failed");
                });
            }
            else{
              $scope.error=true;
              if(!$contact)
              {
                $scope.errormessage="Contact Details are Invalid!";
              }
              else if(!$contact.Contact_Name)
              {
                $scope.errormessage="Contact Name is Required !";
              }
              else if(!$contact.Contact_Mobile_No && !$contact.Contact_Telephone_No)
              {
                $scope.errormessage="Contact Number is Invalid !";
              }
              else if(!$contact.Contact_Email){
                $scope.errormessage="Contact Email is Invalid !";
              }
              else{
                $scope.errormessage="City is Invalid !";
              }
            }
    }
});