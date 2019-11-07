class HcodeGrid {
    constructor(configs) {
        configs.listeners = Object.assign({
            afterUpdateClick: e => {
                $('#modal-update').modal('show');
            },
            afterDeleteClick: e => {
                window.location.reload();
            },
            afterFormCreate: e => {
                window.location.reload();
            },
            afterFormUpdate: e => {
                window.location.reload();
            },
            afterFormCreateError: e => {
                alert('Não foi possível enviar o formulário.');
            },
            afterFormUpdateError: e => {
                alert('Não foi possível enviar o formulário.');
            }
        }, configs.listeners);

        this.options = Object.assign({}, {        
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad: (form, name, data) => {
                let input = form.querySelector(`[name=${name}]`);

                switch(name) {
                    case 'photo':
                        form.querySelector('img').src = '/' + data[name];
                        break;
                    
                    default:
                        if(input) input.value = data[name];
                }
            }
        }, configs);

        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initForms();
        this.initButtons();
    }

    initForms() {
        this.formCreate = document.querySelector(this.options.formCreate);

        if(this.formCreate) {
            this.formCreate.save({
                success: () => {
                    this.fireEvent('afterFormCreate');
                },
                failure: () => {
                    this.fireEvent('afterFormCreateError');
                }
            });
        }

        this.formUpdate = document.querySelector(this.options.formUpdate);

        if(this.formUpdate) {
            this.formUpdate.save({
                success: () => {
                    this.fireEvent('afterFormUpdate');
                },
                failure: () => {
                    this.fireEvent('afterFormUpdateError');
                }
            });
        }
    }

    initButtons() {
        this.rows.forEach(row => {
            [...row.querySelectorAll('.btn')].forEach(btn => {
                btn.addEventListener('click', e => {
                    if(e.target.classList.contains(this.options.btnUpdate)) {
                        this.btnUpdateClick(e);
                    } else if(e.target.classList.contains(this.options.btnDelete)) {
                        this.btnDeleteClick(e);
                    } else {
                        this.fireEvent('buttonClick', [e.target, this.getTrData(e), e]);
                    }
                });
            });
        });
    }

    btnUpdateClick(e) {
        this.fireEvent('beforeUpdateClick', [e]);
                
        let data = this.getTrData(e);
        
        for(let name in data) {
            this.options.onUpdateLoad(this.formUpdate, name, data);
        }

        this.fireEvent('afterUpdateClick', [e]);
    }

    btnDeleteClick(e) {
        this.fireEvent('beforeDeleteClick');

        let data = this.getTrData(e);

        if(confirm(eval('`' + this.options.deleteMsg + '`'))) {
            fetch(eval('`' + this.options.deleteUrl + '`'), {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(json => {
                    this.fireEvent('afterDeleteClick');
                });
        }
    }

    getTrData(e) {
        let tr = e.path.find(el => {
            return (el.tagName.toUpperCase() === 'TR');
        });

        return JSON.parse(tr.dataset.row);
    }

    fireEvent(name, args) {
        if(this.options.listeners[name] && typeof this.options.listeners[name] === 'function')
            this.options.listeners[name].apply(this, args);
    }
}