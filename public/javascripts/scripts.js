/**
 * Created by adm_korolev on 07.04.2016.
 */

function first_button_click() {
    socket.emit('first_button_click_on_web_page', { data: "text"});
    console.log('Function button click - OK!');
}