/**
 * Created by nnnyyy on 2016-05-18.
 */

function tour_article(title, img_url, article) {

    document.write('<table class="tour_info"><tr class="tour_info_title"><td colspan="2" class="tour_info_title">' + title +
        '</td></tr><tr class="tour_info_article"><td class="tour_info_article_left"><img src="'+ img_url +'"/>' +
        '</td><td class="tour_info_article_right">' + article + '</td></tr></table>');
}