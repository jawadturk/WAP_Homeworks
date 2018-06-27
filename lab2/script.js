const { Observable, Subject, ReplaySubject, from, of, range } = rxjs;
const { map, filter, switchMap } = rxjs.operators;
window.onload = pageLoaded;


function pageLoaded() {
    Array.prototype.odd = function () {
        var functionOdd = function () {
            var oddValuesArray = [];
            from(this)
                .pipe(
                    filter(values => values % 2 != 0)
                )
                .subscribe(
                    oddValue => {
                        oddValuesArray.push(oddValue);
                    }
                );
            console.log(oddValuesArray);
        };

        setTimeout(functionOdd.bind(this), 0);
    }
    Array.prototype.even = function () {
        var functionEven = function () {
            var evenvaluesArray = [];
            from(this)
                .pipe(
                    filter(values => values % 2 == 0)
                )
                .subscribe(
                    evenValues => {
                        evenvaluesArray.push(evenValues);
                    }
                );
            console.log(evenvaluesArray);
        };
        setTimeout(functionEven.bind(this), 0);
    }
    console.log('start');
    [1, 2, 3, 4, 5, 6, 7, 8].even();
    [1, 2, 3, 4, 5, 6, 7, 8].odd();
    console.log('end');
}