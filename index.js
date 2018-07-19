"use strict";

const {performance} = require('perf_hooks');

const executionTime = function(){
	this.starttime = performance.now();

	this.result = function(){
		return performance.now() - this.starttime;
	};
};

const ObjectSortByValue = function(obj){
	const sortable = [];
	for(let key in obj) if(obj.hasOwnProperty(key)){
		sortable.push([key, obj[key]]);
	}
	return sortable.sort((a, b) => a[1]-b[1]);
};

const sortMethods = {
	bubble_sort: function (items) {
		let swapped;
		do {
			swapped = false;
			for (let i = 1, len = items.length; i < len; i++) {
				if (items[i - 1] > items[i]) {
					[items[i - 1], items[i]] = [items[i], items[i - 1]];
					swapped = true;
				}
			}
		} while (swapped);
		return items;
	},

	insertion_sort: function (items) {
		for (let i = 1, len = items.length; i < len; i++) {
			const tmp = items[i];
			let j;
			for (j = i - 1; j >= 0 && (items[j] > tmp); j--) {
				items[j + 1] = items[j];
			}
			items[j + 1] = tmp;
		}
		return items;
	},

	selection_sort: function (items) {
		for (let i = 0, len = items.length; i < len; i++) {
			let mi = i;
			for (let j = i + 1; j < items.length; j++) {
				if (items[j] < items[mi])
					mi = j;
			}
			[items[i], items[mi]] = [items[mi], items[i]];
		}
		return items;
	},

	merge_sort: function(items) {
		if (items.length < 2) {
			return items;
		}
		const middle = Math.floor(items.length / 2),
			left = items.slice(0, middle),
			right = items.slice(middle),
		merge = function(left, right) {
			let result = [],
				indexLeft = 0,
				indexRight = 0;

			while (indexLeft < left.length && indexRight < right.length) {
				if (left[indexLeft] < right[indexRight]) {
					result.push(left[indexLeft]);
					indexLeft++;
				} else {
					result.push(right[indexRight]);
					indexRight++;
				}
			}

			return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
		};
		return merge(
			this.merge_sort(left),
			this.merge_sort(right)
		);
	},

	quick_sort: function(items, left=0, right){
		if(right==='undefined') right = items.length;
		const partition = function(items, i, j) {
			const pivot   = items[Math.floor((i + j) / 2)];
			while (i <= j) {
				while (items[i] < pivot) {
					i++;
				}
				while (items[j] > pivot) {
					j--;
				}
				if (i <= j) {
					[items[i], items[j]] = [items[j], items[i]];
					i++;
					j--;
				}
			}
			return i;
		};
		if (items.length > 1) {
			const index = partition(items, left, right);
			if (left < index - 1) {
				this.quick_sort(items, left, index - 1);
			}
			if (index < right) {
				this.quick_sort(items, index, right);
			}
		}
		return items;
	}

};
for(let k=1;k<5;k++){
	const items = [],
		results = {};
	for(let i=0;i<Math.pow(10,k);i++){
		items.push(Math.round(Math.random()*100));
	}
	for(let method in sortMethods) if(sortMethods.hasOwnProperty(method)){
		const timer = new executionTime();
		sortMethods[method](items).slice(0,10);
		results[method] = timer.result();
	}
	console.log(' ==== '+k+' ==== ');
	console.log(ObjectSortByValue(results));
}
