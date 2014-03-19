describe('taSanitize', function(){
	'use strict';
	beforeEach(module('textAngular'));
	beforeEach(module('ngSanitize'));

	describe('no style attributes are allowed', function(){
		describe('validated color attribute', function(){
			it('name', inject(function(taSanitize){
				var result = angular.element(taSanitize('<div style="color: blue;"></div>'));
				expect(result.attr('style')).toBe(undefined);
			}));
		});

		describe('validated height attribute', function(){
			it('name', inject(function(taSanitize){
				var result = angular.element(taSanitize('<div style="height: 100px"></div>'));
				expect(result.attr('style')).toBe(undefined);
			}));
		});
		
		describe('validated text-align attribute', function(){
			it('left', inject(function(taSanitize){
				var result = angular.element(taSanitize('<div style="text-align: left;"></div>'));
				expect(result.attr('style')).toBe(undefined);
			}));

		});
		
		describe('un-validated are removed', function(){
			it('removes non whitelisted values', inject(function(taSanitize){
				var result = taSanitize('<div style="height: 12px;"></div>');
				expect(result).toBe('<div></div>');
			}));
			it('removes non whitelisted values leaving valid values', inject(function(taSanitize){
				var result = taSanitize('<div style="text-align: left; height: 12px;"></div>');
				expect(result).toBe('<div></div>');
			}));
		});
	});
});