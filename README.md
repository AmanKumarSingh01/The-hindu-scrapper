# The-hindu-scrapper

****End Points*****


For getting national headlines with pictures
METHOD : POST ; URL = https://greatscrapper.herokuapp.com/api/national-headlines-with-pictures/ ; payload = { pages :5}\n
This will fetch the first five page of national headlines for you\n
Responce format : {
                      headlines ,
                      Image ,
                      Link
                   }\n\n\n
                   
                   

For getting International headlines with pictures\n
METHOD : POST ; URL = https://greatscrapper.herokuapp.com/api/international/ ; PAYLOAD = { pages :5}\n
This will fetch the first five page of internatonal headlines for you\n
Responce format : {
                      headlines ,
                      Image ,
                      Link
                   }
                   \n\n\n
                   

For getting Editorial headlines with pictures\n
METHOD : POST ; URL = https://greatscrapper.herokuapp.com/api/editorial/ ; PAYLOAD = { pages :5}\n
This will fetch the first five page of editorial headlines for you\n
Responce format : {
                      headlines ,
                      Image ,
                      Link
                   }\n\n\n
                   
                   


For getting full post
METHOD : POST ; URL = https://greatscrapper.herokuapp.com/api/get-stuffs/ ; PAYLOAD = { url : url} ;
This will fetch you data the detail data
Here the url will be the link which you will get from above request
