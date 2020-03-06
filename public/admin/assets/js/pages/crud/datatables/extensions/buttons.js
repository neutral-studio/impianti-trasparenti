"use strict";
var KTDatatablesExtensionButtons = function() {

    var initTable1 = function() {

        // begin first table
        var table = $('#kt_table_1').DataTable({
            responsive: true,
            // Pagination settings
            dom: "<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>\
			<'row'<'col-sm-12'tr>>\
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",

            buttons: [
                'print',
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5',
            ],
            columnDefs: [{
                    targets: 6,
                    render: function(data, type, full, meta) {
                        var status = {
                            1: {
                                'title': 'Pending',
                                'class': 'kt-badge--brand'
                            },
                            2: {
                                'title': 'Delivered',
                                'class': ' kt-badge--danger'
                            },
                            3: {
                                'title': 'Canceled',
                                'class': ' kt-badge--primary'
                            },
                            4: {
                                'title': 'Success',
                                'class': ' kt-badge--success'
                            },
                            5: {
                                'title': 'Info',
                                'class': ' kt-badge--info'
                            },
                            6: {
                                'title': 'Danger',
                                'class': ' kt-badge--danger'
                            },
                            7: {
                                'title': 'Warning',
                                'class': ' kt-badge--warning'
                            },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                },
                {
                    targets: 7,
                    render: function(data, type, full, meta) {
                        var status = {
                            1: {
                                'title': 'Online',
                                'state': 'danger'
                            },
                            2: {
                                'title': 'Retail',
                                'state': 'primary'
                            },
                            3: {
                                'title': 'Direct',
                                'state': 'success'
                            },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge kt-badge--' + status[data].state + ' kt-badge--dot"></span>&nbsp;' +
                            '<span class="kt-font-bold kt-font-' + status[data].state + '">' + status[data].title + '</span>';
                    },
                },
            ],
        });

    };

    var initTable2 = function() {

        // begin first table
        var table = $('#kt_table_2').DataTable({
            responsive: true,

            buttons: [
                'print',
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5',
            ],
            columnDefs: [{
                    targets: 2,
                    render: function(data, type, full, meta) {
                        var status = {
                            1: {
                                'title': 'Diretta',
                                'class': 'kt-label-bg-color-1 kt-shape-font-color-1'
                            },
                            2: {
                                'title': 'Diretta Esterna',
                                'class': 'kt-label-bg-color-1 kt-shape-font-color-1'
                            },
                            3: {
                                'title': 'Convenzione',
                                'class': 'kt-label-bg-color-1 kt-shape-font-color-1'
                            },
                            4: {
                                'title': 'S - Diretta',
                                'class': 'kt-label-bg-color-1 kt-shape-font-color-1'
                            },
                            5: {
                                'title': 'S - Convenzione',
                                'class': 'kt-label-bg-color-1 kt-shape-font-color-1'
                            },
                            6: {
                                'title': 'G.S. Conc.',
                                'class': 'kt-label-bg-color-1 kt-shape-font-color-1'
                            }
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                },
                {
                    targets: -1,
                    title: 'Azioni',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        return '\
					<span class="dropdown">\
						<a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">\
						  <i class="la la-ellipsis-h"></i>\
						</a>\
						<div class="dropdown-menu dropdown-menu-right">\
							<a class="dropdown-item" href="/admin/impianti/edit/' + data + '"><i class="la la-edit"></i> Modifica Impianto</a>\
							<a class="dropdown-item" href="/admin/impianti/delete/' + data + '"><i class="la la-trash"></i> Elimina Impianto</a>\
						</div>\
					</span>';
                    },
                },
            ],
            processing: true,
            serverSide: false
        });

        $('#export_print').on('click', function(e) {
            e.preventDefault();
            table.button(0).trigger();
        });

        $('#export_copy').on('click', function(e) {
            e.preventDefault();
            table.button(1).trigger();
        });

        $('#export_excel').on('click', function(e) {
            e.preventDefault();
            table.button(2).trigger();
        });

        $('#export_csv').on('click', function(e) {
            e.preventDefault();
            table.button(3).trigger();
        });

        $('#export_pdf').on('click', function(e) {
            e.preventDefault();
            table.button(4).trigger();
        });

    };

    var initTable3 = function() {

        // begin first table
        var table = $('#kt_table_3').DataTable({
            responsive: true,

            buttons: [
                'print',
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5',
            ],
            columnDefs: [{
                targets: -1,
                title: 'Azioni',
                orderable: false,
                render: function(data, type, full, meta) {
                    return '\
					<span class="dropdown">\
						<a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">\
						  <i class="la la-ellipsis-h"></i>\
						</a>\
						<div class="dropdown-menu dropdown-menu-right">\
							<a class="dropdown-item" href="/admin/society/edit/' + data + '"><i class="la la-edit"></i> Modifica Gestore</a>\
							<a class="dropdown-item" href="/admin/society/delete/' + data + '"><i class="la la-trash"></i> Elimina Gestore</a>\
						</div>\
					</span>';
                },
            }, ],
            processing: true,
            serverSide: false
        });

        $('#export_print').on('click', function(e) {
            e.preventDefault();
            table.button(0).trigger();
        });

        $('#export_copy').on('click', function(e) {
            e.preventDefault();
            table.button(1).trigger();
        });

        $('#export_excel').on('click', function(e) {
            e.preventDefault();
            table.button(2).trigger();
        });

        $('#export_csv').on('click', function(e) {
            e.preventDefault();
            table.button(3).trigger();
        });

        $('#export_pdf').on('click', function(e) {
            e.preventDefault();
            table.button(4).trigger();
        });

    };

    return {

        //main function to initiate the module
        init: function() {
            initTable1();
            initTable2();
            initTable3();
        }
    };
}();

jQuery(document).ready(function() {
    KTDatatablesExtensionButtons.init();
});