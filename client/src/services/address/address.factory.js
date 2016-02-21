angular.module('services')
    .factory('Address', [
        '$http',
        '$location',
        AddressFactory
    ]);

function AddressFactory($http, $location){

    function Address(options, parent){
        _.extend(this, options);

        this.data = this.parseComponents(options.address_components);
        this.data.type = 'business';
        this.debouncedSync = _.debounce(this.sync.bind(this), 250);

        this.save();
    }

    Address.prototype.unlink = function(){
        _.pull(this.parent.children, this);
    }

    Address.prototype.unselect = function(){
        this.parent.selection = undefined;
    }

    Address.prototype.selectClosest = function(){
        if(this !== this.parent.selection){return;}

        var index = _.indexOf(this.parent.children, this);
        if(index === -1){return;}
        this.parent.selection = this.parent.children[index+1] || this.parent.children[index-1];
    };

    Address.prototype.parseComponents = function(components){
        var data = {};
        _.each(this.address_components, function(component){
            _.each(component.types, function(type){
                data[_.camelCase(type)] = component.long_name;
            });
        });

        if(data.streetNumber){
            data.streetNumber = Number(data.streetNumber);
        }
        if(data.postalCode){
            data.postalCode = Number(data.postalCode);
        }

        return data;
    };

    Address.prototype.typeIcon = function(){
        var icon = this.syncing ? '<i class="fa fa-spinner fa-spin fa-1x float-right"></i> ' : '<i class="fa fa-spinner fa-spin fa-1x invisible float-right"></i> ';

        if(this.data.type==='other'){
            icon += '<i class="fa fa-question"></i>';
        }else if(this.data.type==='mailing'){
            icon += '<i class="fa fa-envelope-o"></i>';
        }else if(this.data.type==='business'){
            icon += '<i class="fa fa-building"></i>';
        }

        return icon;
    }

    Address.prototype.clip = function(){
        var dummyEl = document.createElement('textarea');
        dummyEl.innerHTML = this.toString();

        document.body.appendChild(dummyEl);
        dummyEl.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(dummyEl);
            return true;
        } catch(err){
            document.execCommand('copy');
            document.body.removeChild(dummyEl);
            return false;
        }
    };

    Address.prototype.toString = function(){
        return this.rowStrings().slice(1).join('\n');
    };

    Address.prototype.htmlString = function(){
        return _.map(this.rowStrings(), function(row){
            return '<div class="row">'+row+'</div>';
        }).join('');
    };

    Address.prototype.rowStrings = function(){
        return  [
            this.typeIcon(),
            _.compact([this.data.streetNumber, this.data.route]).join(' '),
            _.compact([this.data.locality ? this.data.locality+',': null, this.data.administrativeAreaLevel1, this.data.postalCode]).join(' '),
            [this.data.country],
        ];
    };

    Address.prototype.baseUrl = function(){
        return '/api/address';
    };

    Address.prototype.delete = function(){
        var that = this;
        this.syncing = true;
        var options = {
            method: 'DELETE',
            url: this.baseUrl(),
            data: JSON.stringify(this.data),
        };
        return $http(options)
            .finally(function(res){
                that.syncing = false;
                return res;
            });
    };

    Address.prototype.save = function(){
        var that = this;
        this.syncing = true;
        var options = {
            method: 'POST',
            url: this.baseUrl(),
            data: JSON.stringify(this.data),
        };
        return $http(options)
            .finally(function(res){
                that.syncing = false;
                return res;
            });
    };

    Address.prototype.sync = function(){
        var that = this;
        this.syncing = true;
        var options = {
            method: 'PUT',
            url: this.baseUrl(),
            data: JSON.stringify(this.data),
        };
        return $http(options)
            .finally(function(res){
                that.syncing = false;
                return res;
            });
    }

    return Address;
}

