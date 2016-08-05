/**
 * @author:ParhamZare
 * Powered by WebWell.ir
 */
"use strict";
angular.module("iPersian", [])
    .filter('pDate', ['$filter', '$locale',
        function (filter, locale, input) {
            return function (input, currencySymbol) {
                var v1 = input.toString().split(" ");
                var v2 = v1[0].split('-');
                var gy = parseInt(v2[0]);
                var gm = parseInt(v2[1]);
                var gd = parseInt(v2[2]);
                var g_d_m, jy, gy2, days, jm, jd;
                g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                jy = (gy <= 1600) ? 0 : 979;
                gy -= (gy <= 1600) ? 621 : 1600;
                gy2 = (gm > 2) ? (gy + 1) : gy;
                days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100))
                    + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
                jy += 33 * (parseInt(days / 12053));
                days %= 12053;
                jy += 4 * (parseInt(days / 1461));
                days %= 1461;
                jy += parseInt((days - 1) / 365);
                if (days > 365)days = (days - 1) % 365;
                jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
                jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
                return jy.toString() + '/' + jm.toString() + '/' + jd.toString() + ' ' + (v1[1] == undefined ? '' : v1[1] );
            };
        }
    ])
    .filter('eDate', ['$filter', '$locale',
        function (filter, locale, input) {
            return function (input, currencySymbol) {

                if (input == undefined) {
                    return 'Error'
                }
                var jy, jm, jd, gm;
                input = input.split('/');
                jy = parseInt(input[0]);
                jm = parseInt(input[1]);
                jd = parseInt(input[2]);
                var gy = (jy <= 979) ? 621 : 1600;
                jy -= (jy <= 979) ? 0 : 979;
                var days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4))
                    + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
                gy += 400 * (parseInt(days / 146097));
                days %= 146097;
                if (days > 36524) {
                    gy += 100 * (parseInt(--days / 36524));
                    days %= 36524;
                    if (days >= 365)days++;
                }
                gy += 4 * (parseInt((days) / 1461));
                days %= 1461;
                gy += parseInt((days - 1) / 365);
                if (days > 365)days = (days - 1) % 365;
                var gd = days + 1;
                var sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                for (gm = 0; gm < 13; gm++) {
                    var v = sal_a[gm];
                    if (gd <= v)break;
                    gd -= v;
                }
                return gy + '-' + (gm <= 9 ? '0' + gm : gm) + '-' + (gd <= 9 ? '0' + gd : gd);
            };
        }
    ])
    .filter('pPrice', ['$filter', '$locale',
        function (filter, locale, input) {
            return function (input, currencySymbol) {
                if (parseInt(input) < 10000) {
                    return filter('seprate')(input / 10);
                }
                else if (parseInt(input) > 10000) {
                    if (parseInt(input) >= 500000) {
                        return filter('seprate')(Math.trunc(input / 10000));
                    }
                    else if (parseInt(input) < 500000) {

                        return (input / 10000);
                    }
                }
                else if (parseInt(input) == 10000) {
                    return '';
                }

            };
        }
    ])
    .filter('cPrice', ['$filter', '$locale',
        function (filter, locale, input) {
            return function (input, currencySymbol) {
                if (parseInt(input) < 10000) {
                    return 'تومان';
                }
                else if (parseInt(input) >= 10000) {
                    return 'هزار تومان'
                }
            };
        }
    ])
    .filter('seprate', ['$filter', '$locale',
        function (filter, locale, input) {

            var currencyFilter = filter('currency');
            var formats = locale.NUMBER_FORMATS;
            return function (amount, currencySymbol) {
                if (amount !== undefined) {
                    if (parseInt(amount) < 0) {
                        amount = 0;
                    }
                    var value = currencyFilter(amount, '');
                    var sep = value.indexOf(formats.DECIMAL_SEP);
                    if (amount >= 0) {
                        return value.substring(0, sep);
                    }
                    return value.substring(0, sep) + ')';
                }
            }
        }
    ])
    .filter('pNumber', ['$filter', '$locale',
        function (filter, locale, input) {
            return function (input, currencySymbol) {
                var persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", '/'];
                for (var i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
                    if (persianNumbers[i] === '/') {
                        input = input.toString().replace(".", persianNumbers[i]);
                    } else {
                        input = input.toString().replace(new RegExp(i, "g"), persianNumbers[i]);
                    }
                }
                return input;
            };
        }
    ]);


