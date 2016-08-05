# AngularPersian
Angular Persian For Convert Persian Date To Gregorian Date ...  
Angular Persian Use http://jdf.scr.ir For Convert Date

#Installation
Copy the script into your project and add a script and link tag to your page.
Add a dependency to your application module.
```
<pre>angular.module('myApp', ['iPersian']);</pre>
```
#Example For Convert Date :
```
{{date|pDate}} //For Convert Gregorian Date To Persian 

{{date2|eDate}} //For Convert Persian Date To Gregorian
```
#Example For Price Rial to Toman Date With Seprate : 
```
{{price|pPrice}} {{price|cPrice}} // Price Rial to Toman Date 
//Input: 1,000,000
//Output: 1,000 هزار تومان

```
#Example For Price Rial to Toman Date With Seprate And Persian Number : 
```
{{price|pPrice|pNumber}} {{price|cPrice}} // Price Rial to Toman Date 
//Input: 1,000,000
//Output:۱,۰۰۰ هزار تومان

```

