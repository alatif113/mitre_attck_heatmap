"use strict";define(["jquery","underscore","api/SplunkVisualizationBase","api/SplunkVisualizationUtils","enterpriseAttack"],(function(t,a,e,r,n){return e.extend({initialize:function(){e.prototype.initialize.apply(this,arguments),this.$el=t(this.el),this.$el.addClass("mitre-container"),this.colorMap=[{pct:0,color:{r:99,g:190,b:123}},{pct:50,color:{r:255,g:213,b:132}},{pct:100,color:{r:248,g:105,b:107}}]},formatData:function(t){if(t.rows.length<1)return!1;if(t.rows[0].length<2)throw new e.VisualizationError("Search results must have at least 2 fields: id, count");return t},updateView:function(a,e){if(a){this.$el.empty();var i=this,c="https://attack.mitre.org/techniques/",s=this.colorMap,o=e[this.getPropertyNamespaceInfo().propertyNamespace+"theme"]||"light",l=e[this.getPropertyNamespaceInfo().propertyNamespace+"startColor"]||"#53a051",d=e[this.getPropertyNamespaceInfo().propertyNamespace+"midColor"]||"#f8be34",m=e[this.getPropertyNamespaceInfo().propertyNamespace+"endColor"]||"#dc4e41",p=e[this.getPropertyNamespaceInfo().propertyNamespace+"startVal"]||0,h=e[this.getPropertyNamespaceInfo().propertyNamespace+"endVal"]||100,v=e[this.getPropertyNamespaceInfo().propertyNamespace+"display"]||"id",u=r.escapeHtml(e[this.getPropertyNamespaceInfo().propertyNamespace+"legendTitle"]),g=e[this.getPropertyNamespaceInfo().propertyNamespace+"sortKey"]||"data-id",f=e[this.getPropertyNamespaceInfo().propertyNamespace+"sortOrder"]||"asc";this.$el.attr("class","").addClass(o),s[0].color=this._hexToRgb(l),s[1].color=this._hexToRgb(d),s[2].color=this._hexToRgb(m);var b=t('<div class="mtr-viz-container"></div>');$colorMeter=t('\n            <div class="mtr-legend">\n                <div class="mtr-legend-title">'+u+'</div>\n                <div class="mtr-legend-meter"></div>\n                <div class="mtr-legend-val">\n                    <span>'+p+"</span>\n                    <span>"+(h-p)/2+"</span>\n                    <span>"+h+"</span>\n                </div>\n            </div>\n        ");var _="(45deg, "+l+" 0%, "+d+" 50%, "+m+" 100%)";$colorMeter.find(".mtr-legend-meter").css("background","-moz-linear-gradient"+_).css("background","-webkit-linear-gradient"+_).css("background","linear-gradient"+_),n.tactics.forEach((function(a){$tactic_col=t('<div class="mtr-tactic-col" data-name="'.concat(a.name,'" data-tactic="').concat(a.short_name,'">')),$tactic_col.appendTo(b).append('\n                    <div class="mtr-tactic">\n                        <div class="mtr-tactic-title">'.concat(a.name,'</div>\n                        <div class="mtr-meter-container">\n                            <div class="mtr-meter-fill">\n                                <div class="mtr-stats-container">\n                                    <div class="mtr-total mtr-stat">\n                                        <div class="mtr-stats-label">Total</div>\n                                        <div class="mtr-stats-val"></div>\n                                    </div>\n                                    <div class="mtr-count mtr-stat">\n                                        <div class="mtr-stats-label">Unique Techniques</div>\n                                        <div class="mtr-stats-val"></div>\n                                    </div>\n                                    <div class="mtr-mean mtr-stat">\n                                        <div class="mtr-stats-label">Average per Technique</div>\n                                        <div class="mtr-stats-val"></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="mtr-technique-col"></div>\n            ')),t(".mtr-tactic-title",b).click((function(a){drilldown_data={mtr_tactic:t(this).parents(".mtr-tactic-col").attr("data-name")},i._drilldown(drilldown_data,a)}))})),n.techniques.forEach((function(a){var e="id"==v?a.id:a.name,r=t('\n                <div class="mtr-technique mtr-display-'.concat(v,'" data-id="').concat(a.id,'" data-name="').concat(a.name,'" data-value="" data-percent="" data-desc=""><span>').concat(e,"</span></div>\n            "));a.tactics.forEach((function(a){r.clone().prependTo(t('.mtr-tactic-col[data-tactic="'.concat(a,'"] .mtr-technique-col'),b))}))})),a.rows.forEach((function(e){var n=r.escapeHtml(e[0]),c=r.escapeHtml(e[1]),s=t('.mtr-technique[data-id="'.concat(n,'"]'),b);if(s.click((function(r){drilldown_data={},e.forEach((function(t,e){drilldown_data[a.fields[e].name]=t})),drilldown_data.mtr_name=t(this).attr("data-name"),drilldown_data.mtr_tactic=t(this).parents(".mtr-tactic-col").attr("data-name"),i._drilldown(drilldown_data,r)})),s&&""!=c&&null!=c&&!isNaN(c)){var o=i._getPercent(p,h,c),l=i._getColor(o),d=r.escapeHtml(e[2])||"";o<2&&(o=2),s.attr("data-value",c),s.attr("data-percent",o),s.attr("data-desc",d),s.css("background",l.background).css("color",l.foreground)}})),t(".mtr-technique",b).hover((function(){var e=t(this).attr("data-id"),r=t(this).attr("data-name"),n=parseInt(t(this).attr("data-percent")),s=t(this).attr("data-desc"),o=parseInt(t(this).attr("data-value"))||"",l=i._getColor(n);n<2&&(n=2);var d=t('\n                <div class="mtr-technique-tooltip">\n                    <div class="mtr-id">'.concat(e,'</div>\n                    <div class="mtr-name">').concat(r,'</div>\n                    <div class="mtr-meter-container">\n                        <div class="mtr-meter-fill"></div>\n                    </div>\n                    <div class="mtr-label"></div>\n                    <div class="mtr-val">').concat(o,'</div>\n                    <div class="mtr-desc"></div>\n                    <div class="mtr-ref"><a target="_blank" href="').concat(c).concat(e,'">').concat(c).concat(e,' <i class="icon-external"></i></a></div>\n                </div>\n            '));t(this).offset().left>t(window).width()-400?d.addClass("mtr-technique-tooltip-left"):d.addClass("mtr-technique-tooltip-right"),t(".mtr-desc",d).append("<p>"+s.split("\\n").join("</p><p>")+"</p>"),d.appendTo(t(this)).animate({opacity:1},200,"linear"),o&&(t(".mtr-label",d).text(a.fields[1].name),t(".mtr-meter-fill",d).css("background",l.background).animate({width:t(this).attr("data-percent")+"%"},50,"linear"),l.luminance<.1&&t(".mtr-meter-container",d).addClass("dark"))}),(function(){t(".mtr-technique-tooltip").remove()})),t(".mtr-tactic-col",b).each((function(){var a=0,e=0,r=0;t(".mtr-technique",this).each((function(){r+=1;var n=t(this).attr("data-value");n&&!isNaN(n)&&(a+=+n,e+=1)}));var n=Math.round(a/e),c=Math.round(e/r*100);n||(n=0),c||(c=0);var s=i._getPercent(p,h,n),o=i._getColor(s);s<2&&(s=2),t(".mtr-tactic .mtr-meter-fill",this).css("background",o.background).css("color",o.foreground).css("width",s+"%"),t(".mtr-tactic .mtr-stat",this).css("background",o.background).css("color",o.foreground).css("border-color",o.foreground),t(".mtr-tactic .mtr-total .mtr-stats-val",this).text(a.toLocaleString()),t(".mtr-tactic .mtr-count .mtr-stats-val",this).text(e.toLocaleString()+" (".concat(c,"%)")),t(".mtr-tactic .mtr-mean .mtr-stats-val",this).text(n.toLocaleString())})),t(".mtr-technique-col",b).each((function(){i._sortElements(t(this),g,f),t(this).append('\n                <div class="mtr-technique mtr-placeholder mtr-display-'.concat(v,'">\n                    <div class="mtr-technique-title">T0000</div>\n                </div>\n                <div class="mtr-technique mtr-placeholder mtr-display-').concat(v,'">\n                    <div class="mtr-technique-title">T0000</div>\n                </div>\n            '))})),b.appendTo(this.$el),$colorMeter.appendTo(this.$el)}},getInitialDataParams:function(){return{outputMode:e.ROW_MAJOR_OUTPUT_MODE}},reflow:function(){},_getPercent:function(t,a,e){var r=Math.round(100*(e-t)/(a-t));return r>100&&(r=100),r<0&&(r=0),r},_hexToRgb:function(t){var a=0,e=0,r=0;return 4==t.length?(a="0x"+t[1]+t[1],e="0x"+t[2]+t[2],r="0x"+t[3]+t[3]):7==t.length&&(a="0x"+t[1]+t[2],e="0x"+t[3]+t[4],r="0x"+t[5]+t[6]),{r:a,g:e,b:r}},_getColor:function(t){for(var a=1;a<this.colorMap.length-1&&!(t<this.colorMap[a].pct);a++);var e=this.colorMap[a-1],r=this.colorMap[a],n=r.pct-e.pct,i=(t-e.pct)/n,c=1-i,s=i,o={r:Math.floor(e.color.r*c+r.color.r*s),g:Math.floor(e.color.g*c+r.color.g*s),b:Math.floor(e.color.b*c+r.color.b*s)},l=(.299*o.r+.587*o.g+.114*o.b)/255,d=l>.65?"rgb(0,0,0)":"rgb(255,255,255)";return{background:"rgb("+[o.r,o.g,o.b].join(",")+")",luminance:l,foreground:d}},_sortElements:function(a,e,r){var n="asc"==r?1:-1;$children=a.children().sort((function(a,r){return"data-id"==e||"data-name"==e?n*(t(a).attr(e)<t(r).attr(e)?-1:1):"data-value"==e?(aVal=parseInt(t(a).attr(e)),bVal=parseInt(t(r).attr(e)),Number.isInteger(aVal)||(aVal=-1),Number.isInteger(bVal)||(bVal=-1),n*(aVal<bVal?-1:1)):0})),a.append($children)},_drilldown:function(t,a){this.drilldown({action:e.FIELD_VALUE_DRILLDOWN,data:t},a)}})}));