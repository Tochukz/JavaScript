<html>
<head>
<title>JavaScript Regular Expression</title>
<script>
function br(){
 return document.write("<br />");	
}
</script>
</head>
<body>
<script>
var str = "true1984728903";
		var reg = str.match(/\w\d/);
		var reg1 = str.match(/[a-z]\d\d/)
		document.write(reg);
		br();
		document.write(reg1);
		br();
var strVar = "Now is the time";
	strVar1 = strVar.match(/\w{2,4}/g);
	document.write(strVar1);
	br();
var strWord = "abcde";
	strWord1 = strWord.match(/ab|cd/);
	document.write(strWord1);
</script>
</body>
</html>