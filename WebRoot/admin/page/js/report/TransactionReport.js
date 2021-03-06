/**********************************************
库存余量 :Transaction.js

注意: 无法实现动态的grid，分别作了多个grid，一个store，每个grid显示的列不同，查询方法是一个
**********************************************/

Ext.define('Transaction', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},            
		{name:'sku'},     
		{name:'loc'},
		{name:'lot'},  
		{name:'udf1',type:'float'},  
		{name:'gid'},  
		{name:'qty',type:'float'},
		{name:'qtyallocated',type:'float'},
		{name:'qtyonhold',type:'float'},
		{name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable04'},
		{name:'lottable05'},
		{name:'lottable06'},
		{name:'lottable07'},
		{name:'lottable08'},
		{name:'lottable09'},
		{name:'lottable10'},
		{name:'lottable11'},
		{name:'lottable12'},
		{name:'lottable13'},
		{name:'lottable14'},
		{name:'lottable15',type:'float'},
		{name:'lottable16'},
		{name:'lottable17'},
		{name:'lottable18'},
		{name:'lottable19'},
		{name:'lottable20'},
		{name:'name'}, //sku表的字段，通过内连接获取  
		{name:'qtyavailable',type:'float'},     //表中没有，自定义字段
		{name:'status'},//lli的状态字段
		{name:'model'},
		{name:'specification'} 
        
        
        
	],
    idProperty: 'id'
});

//通用查询的grid，包括完整的表信息，暂未启用
Ext.define('Redm.inventory.TransactionGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.transactiongrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
     		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "SKU", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
		    { header: "面积", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true},
		    { header: "冻结数量", dataIndex: '', width: 100, sortable: true},
		    { header: "可用数量", dataIndex: '', width: 100, sortable: true},
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: "批重量", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true}
		];
		return true;
    },

	buildDockedItems: function(){
		this.dockedItems = [{
	        xtype: 'pagingtoolbar',
	        store: this.store,  
	        dock: 'bottom',
	        displayInfo: true
	    }];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryTransactionInfo.action','Transaction',20);
      this.callParent(arguments);
    }

});

//按照货主显示
Ext.define('Redm.inventory.StorerGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.storergrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
     		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
//		    { header: "SKU", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},
//		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
//		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "冻结数量", dataIndex: 'qtyonhold', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "可用数量", dataIndex: 'qtyavailable', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')}
		];
		return true;
    },

	buildDockedItems: function(){
		  var me = this;
        var1storerPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2storerPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3storerPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4storerPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
//        var1AllSum = Ext.create('widget.tbtext',{
//            text: '0',
//            format: '0,000'
//        });
//        var2AllSum = Ext.create('widget.tbtext',{
//            text: '0',
//            format: '0,000'
//        });
//        var3AllSum = Ext.create('widget.tbtext',{
//            text: '0',
//            format: '0,000'
//        });
//        var4AllSum = Ext.create('widget.tbtext',{
//            text: '0',
//            format: '0,000'
//        });
		this.dockedItems = [
		{
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页数量：'
                    },var1storerPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页已分配数量：'
                    },var2storerPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页冻结数量：'
                    },var3storerPageSum,
                    {
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页可用数量：'
                    },var4storerPageSum
//                    ,
//                    '-',{
//                        xtype: 'label',
//                        forId: 'myFieldId3',
//                        text: '总数量：'
//                    },var1AllSum,{
//                        xtype: 'label',
//                        forId: 'myFieldId4',
//                        text: '总分配数量：'
//                    },var2AllSum,{
//                        xtype: 'label',
//                        forId: 'myFieldId4',
//                        text: '总冻结数量：'
//                    },var3AllSum,{
//                        xtype: 'label',
//                        forId: 'myFieldId4',
//                        text: '总可用数量：'
//                    },var4AllSum
                ]
            }
	    ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryTransactionByStorer.action','Transaction',20);
      this.callParent(arguments);
    }

});


//按照sku显示
Ext.define('Redm.inventory.SkuGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.skugrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
     		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "SKU", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},            
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "冻结数量", dataIndex: 'qtyonhold', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "可用数量", dataIndex: 'qtyavailable', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')}

		];
		return true;
    },

	buildDockedItems: function(){
		var me = this;
        var1PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var1AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
		this.dockedItems = [
			{
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页数量：'
                    },var1PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页已分配数：'
                    },var2PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页冻结数：'
                    },var3PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页可用数量：'
                    },var4PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总数量：'
                    },var1AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总分配数：'
                    },var2AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总冻结数：'
                    },var3AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总可用数量：'
                    },var4AllSum
                ]
            }
	    ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryTransactionBySku.action','Transaction',20);
      this.callParent(arguments);
    }

});

//按照批次显示
Ext.define('Redm.inventory.LotGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.lotgrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
     		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
//		    { header: "SKU", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},            
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true},
		    { header: "冻结数量", dataIndex: 'qtyonhold', width: 100, sortable: true},
		    { header: "可用数量", dataIndex: 'qtyavailable', width: 100, sortable: true}
/*            { header: "批属性01", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "批属性02", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "批属性03", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "批属性04", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "批属性05", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "批属性06", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "批属性07", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "批属性08", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "批属性09", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "批属性10", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "批属性11", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "批属性12", dataIndex: 'lottable12', width: 100, sortable: true}*/
		];
		return true;
    },

	buildDockedItems: function(){
	   var me = this;
        var1lotPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2lotPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3lotPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4lotPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var1lotAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2lotAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3lotAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4lotAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页数量：'
                    },var1lotPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页已分配数：'
                    },var2lotPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页冻结数：'
                    },var3lotPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页可用数量：'
                    },var4lotPageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总数量：'
                    },var1lotAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总分配数：'
                    },var2lotAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总冻结数：'
                    },var3lotAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总可用数量：'
                    },var4lotAllSum
                ]
            }
	];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryTransactionByLot.action','Transaction',20);
      this.callParent(arguments);
    }

});


//按照LOC显示
Ext.define('Redm.inventory.LocGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.locgrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
     		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
//		    { header: "SKU", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true}//,
//		    { header: "冻结数量", dataIndex: 'qtyonhold', width: 100, sortable: true},
//		    { header: "可用数量", dataIndex: 'qtyavailable', width: 100, sortable: true} //从LLI计算出来的
		];
		return true;
    },

	buildDockedItems: function(){
        var me = this;
        var1locPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2locPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var1locAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2locAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });

        this.dockedItems = [
               {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页数量：'
                    },var1locPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页已分配数量：'
                    },var2locPageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总数量：'
                    },var1locAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总已分配数量：'
                    },var2locAllSum
                ]
            }
        ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryTransactionByLoc.action','Transaction',20);
      this.callParent(arguments);
    }

});

//按照LotxLocxId显示
Ext.define('Redm.inventory.LliGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.lligrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
     		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "SKU", dataIndex: 'sku', width: 150, sortable: true},
    		{ header: "型号", dataIndex: 'model', width: 100, sortable: true},
		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},            
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
		    { header: "面积", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "ID", dataIndex: 'gid', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererStatusFunc
            },
//		    { header: "冻结数量", dataIndex: 'qtyonhold', width: 100, sortable: true},
//		    { header: "可用数量", dataIndex: 'qtyavailable', width: 100, sortable: true},
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: "重量", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true}
		];
		return true;
    },

	buildDockedItems: function(){
		var me = this;
        var1lliPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2lliPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3lliPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4lliPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var1lliAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2lliAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var3lliAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4lliAllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '页数量：'
                    },var1lliPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '页分配数：'
                    },var2lliPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '页重：'
                    },var3lliPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '页面积：'
                    },var4lliPageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总数量：'
                    },var1lliAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总分配数：'
                    },var2lliAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总重：'
                    },var3lliAllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总面积：'
                    },var4lliAllSum
                ]
            }
	    
	    ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryTransactionByLLI.action','Transaction',20);
      this.callParent(arguments);
    },
//LLI status解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue='冻结';
            return retValue;
        }  

});



//主面板
Ext.define('Redm.support.Transaction', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.transactionmanager',
    layout:'border',
    title:'库存余量报表', 
    initComponent: function(){

        //循环按钮，只能调用一次，原因待查
    	this.selectCycle = Ext.create('Ext.button.Cycle',{
            prependText: '',
            showText: true,
            scope: this,
            menu: {
                items: [
                    {
                        text: '按货主',
                        checked: true,    //默认是按照货主
                        url:'byStorer'
                    }, 
                    {
                        text: '按SKU',
                        url:'bySku'
                    }, 
                    {
                        text: '按批次',
                        url:'byLot'
                    },
                    {
                        text: '按库位',
                        url:'byLoc'
                    }, 
                    {  
                        text: '按LOTXLOCXID',
                        url:'byLLI'
                    }
                ]
            },
            scope:this,
		    changeHandler: function(cycleBtn, activeItem) {
//		    	this.onSelectClick(activeItem.url);
		    },
		    handler: function(cycleBtn) {
		    	this.onSelectClick(cycleBtn.getActiveItem().url);
		    },
		    toggleSelected: function() {
		    }
		});
        
    	this.selectCyclePrint = Ext.create('Ext.button.Cycle',{
            prependText: '',
            showText: true,
            scope: this,
            menu: {
                items: [
                    {
                        text: '按货主报表',
                        checked: true,    //默认是按照货主
                        url:'byStorer'
                    }, 
                    {
                        text: '按SKU报表',
                        url:'bySku'
                    }, 
                    {
                        text: '按批次报表',
                        url:'byLot'
                    },
                    {
                        text: '按库位报表',
                        url:'byLoc'
                    }, 
                    {  
                        text: '按LOTXLOCXID报表',
                        url:'byLLI'
                    }
                ]
            },
            scope:this,
		    changeHandler: function(cycleBtn, activeItem) {
//		    	this.onSelectClick(activeItem.url);
		    },
		    handler: function(cycleBtn) {
		    	this.onSelectClickPrint(cycleBtn.getActiveItem().url);
		    },
		    toggleSelected: function() {
		    }
		});    
    	this.items = [this.createTopForm(),this.createPt1Panel()];
      this.callParent(arguments);
    },

	//第一个panel上的 按钮面板
	createTopForm: function(){
    	var me = this;
    	this.topform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
			buttonAlign:'west',    
            layout:'hbox',            
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
            items:[
                this.selectCycle,
                this.selectCyclePrint,
                {
				    text : "重置",
                	iconCls: 'icon-reset',
				    scope : this,
	               handler: function()
	               {
	            	  this.pt1f1form.getForm().reset();
	               }
			    },
                {
                    boxLabel: '是否显示库存为0',
                    xtype: 'checkbox',
                    inputValue:1,
                     margin: '5 0 0 15',
                    name: 'showzero'                
                }
            ]
    	});
    	return this.topform;
    },
    
    
    //底部面板
    createPt1Panel: function(){
    	this.pt1panel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createPt1F1Form(),this.createPt1P2TabPanel()/*this.createTransactionGrid()*/]
    	});
    	return this.pt1panel;
    },
    
    
    createPt1P2TabPanel:function(){
    	var me = this;
        this.pt1p2tabpanle=Ext.create('Ext.tab.Panel',{
    		region: 'center',
    		layout: 'border',
//            height:330,
//    		border: false,
    		items: [me.createPt1P2F1Grid(),me.createPt1P2F2Grid(),me.createPt1P2F3Grid(),me.createPt1P2F4Grid(),me.createPt1P2F5Grid()]
        })
        return this.pt1p2tabpanle;
    },
    
    //按照货主
    createPt1P2F1Grid: function(){
    	var me = this;
        this.pt1p2f1grid = Ext.create('widget.storergrid',{
    		title: '按货主'
    	});
        
	   this.pt1p2f1grid.getStore().on({
           beforeload:{fn:function(store){
    		var params = this.pt1p2f1grid.getStore().getProxy().extraParams;
    		var record = me.pt1f1form.getForm().getValues();
    		var top = me.topform.getForm().getValues();

		    var zeroValues = top.showzero;

		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var lot = record.lot;
		    var lotOver = record.lotOver;

		    var lottable01 = record.lottable01;
		    var lottable01Over = record.lottable01Over;
		    var lottable02 = record.lottable02;
		    var lottable02Over = record.lottable02Over;
		    var lottable03 = record.lottable03;            
		    var lottable03Over = record.lottable03Over;

		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
            var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

			delete params.zeroValues;
			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.lot;
			delete params.lotOver;
            
			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;
			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;

			if(zeroValues) params.zeroValues = zeroValues;
			
			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(lot) params.lot = lot;
			if(lotOver) params.lotOver = lotOver;

			if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;            
            
			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;
            
       },scope: this},
            //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1storerPageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qtyallocated');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2storerPageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
                    var var3Total = store.sum('qtyonhold');
                    var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                    var3storerPageSum.update(var3Html);
                    var var4Total = store.sum('qtyavailable');
                    var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                    var4storerPageSum.update(var4Html);
                },scope: this}
                }); 
    	return this.pt1p2f1grid;
    },
    
    //按照sku
    createPt1P2F2Grid: function(){
    	var me = this;
        this.pt1p2f2grid = Ext.create('widget.skugrid',{
    		title: '按SKU'
    	});
        
		this.pt1p2f2grid.getStore().on({
			beforeload:{fn:function(store){
    		var params = this.pt1p2f2grid.getStore().getProxy().extraParams;
    		var record = me.pt1f1form.getForm().getValues();
            var top = me.topform.getForm().getValues();

            var zeroValues = top.showzero;

		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var lot = record.lot;
		    var lotOver = record.lotOver;

		    var lottable01 = record.lottable01;
		    var lottable01Over = record.lottable01Over;
		    var lottable02 = record.lottable02;
		    var lottable02Over = record.lottable02Over;
		    var lottable03 = record.lottable03;            
		    var lottable03Over = record.lottable03Over;

		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
		    var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

            delete params.zeroValues;

			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.lot;
			delete params.lotOver;
            
			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;
			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;

            if(zeroValues) params.zeroValues = zeroValues;
			
			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(lot) params.lot = lot;
			if(lotOver) params.lotOver = lotOver;

			if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;            
            
			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;
    	 },scope: this},
           //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1PageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qtyallocated');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2PageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
                    var var3Total = store.sum('qtyonhold');
                    var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                    var3PageSum.update(var3Html);
                    var var4Total = store.sum('qtyavailable');
                    var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                    var4PageSum.update(var4Html);
                },scope: this}
                }); 
    	return this.pt1p2f2grid;
    },
    
    //按照批次
    createPt1P2F3Grid: function(){
    	var me = this;
        this.pt1p2f3grid = Ext.create('widget.lotgrid',{
    		title: '按批次'
    	});
        
		  this.pt1p2f3grid.getStore().on({
            beforeload:{fn:function(store){
    		var params = this.pt1p2f3grid.getStore().getProxy().extraParams;
    		var record = me.pt1f1form.getForm().getValues();
            var top = me.topform.getForm().getValues();

            var zeroValues = top.showzero;

		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var lot = record.lot;
		    var lotOver = record.lotOver;

		    var lottable01 = record.lottable01;
		    var lottable01Over = record.lottable01Over;
		    var lottable02 = record.lottable02;
		    var lottable02Over = record.lottable02Over;
		    var lottable03 = record.lottable03;            
		    var lottable03Over = record.lottable03Over;

		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
		    var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

            delete params.zeroValues;

			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.lot;
			delete params.lotOver;
            
			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;
			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;

            if(zeroValues) params.zeroValues = zeroValues;
			
			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(lot) params.lot = lot;
			if(lotOver) params.lotOver = lotOver;

			if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;            
            
			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;
    	    },scope: this},
           //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1lotPageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qtyallocated');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2lotPageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
                    var var3Total = store.sum('qtyonhold');
                    var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                    var3lotPageSum.update(var3Html);
                    var var4Total = store.sum('qtyavailable');
                    var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                    var4lotPageSum.update(var4Html);
                },scope: this}
            }); 
        
    	return this.pt1p2f3grid;
    },
        
    //按照库位
    createPt1P2F4Grid: function(){
    	var me = this;
        this.pt1p2f4grid = Ext.create('widget.locgrid',{
    		title: '按LOC'
    	});
		  this.pt1p2f4grid.getStore().on({
            beforeload:{fn:function(store){
    		var params = this.pt1p2f4grid.getStore().getProxy().extraParams;
    		var record = me.pt1f1form.getForm().getValues();
            var top = me.topform.getForm().getValues();

            var zeroValues = top.showzero;
		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var loc = record.loc;
		    var locOver = record.locOver;

		    var lottable01 = record.lottable01;
		    var lottable01Over = record.lottable01Over;
		    var lottable02 = record.lottable02;
		    var lottable02Over = record.lottable02Over;
		    var lottable03 = record.lottable03;            
		    var lottable03Over = record.lottable03Over;

		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
		     var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

            delete params.zeroValues;
			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.loc;
			delete params.locOver;
            
			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;
			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;

            if(zeroValues) params.zeroValues = zeroValues;
			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(loc) params.loc = loc;
			if(locOver) params.locOver = locOver;

			if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;            
            
			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;
    	  },scope: this},
           //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1locPageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qtyallocated');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2locPageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
                },scope: this}
            });   
    	return this.pt1p2f4grid;
    },
    
    //按照GID
    createPt1P2F5Grid: function(){
    	var me = this;
        this.pt1p2f5grid = Ext.create('widget.lligrid',{
    		title: '按LOTXLOCXID'
    	});
	    this.pt1p2f5grid.getStore().on({
            beforeload:{fn:function(store){
    		var params = this.pt1p2f5grid.getStore().getProxy().extraParams;
    		var record = me.pt1f1form.getForm().getValues();
            var top = me.topform.getForm().getValues();

            var zeroValues = top.showzero;
		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var lot = record.lot;
		    var lotOver = record.lotOver;

		    var model = record.model;
		    var modelOver = record.modelOver;
		    var specification = record.specification;
		    var specificationOver = record.specificationOver;            
            
		    var lottable01 = record.lottable01;
		    var lottable01Over = record.lottable01Over;
		    var lottable02 = record.lottable02;
		    var lottable02Over = record.lottable02Over;
		    var lottable03 = record.lottable03;            
		    var lottable03Over = record.lottable03Over;

		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
		    var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

            delete params.zeroValues;
			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.lot;
			delete params.lotOver;

			delete params.model;
			delete params.modelOver;
			delete params.specification;
			delete params.specificationOver;
            
			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;
			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;

            if(zeroValues) params.zeroValues = zeroValues;
			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(lot) params.lot = lot;
			if(lotOver) params.lotOver = lotOver;
            
            if(model) params.model = model;
			if(modelOver) params.modelOver = modelOver;
			if(specification) params.specification = specification;
			if(specificationOver) params.specificationOver = specificationOver;
			
            if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;            
            
			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;
            },scope: this},
           //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1lliPageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qtyallocated');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2lliPageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
                    var var3Total = store.sum('lottable15');
                    var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                    var3lliPageSum.update(var3Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var4Total = store.sum('udf1');
                    var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                    var4lliPageSum.update(var4Html);
                    //qtyReceivedPageSum.setText(reTotal);
                },scope: this}
            });   
    	return this.pt1p2f5grid;
    },
    
    //底部GRID面板
    createTransactionGrid:function(){
    	var me = this;
    	this.transactiongrid = Ext.create('widget.transactiongrid',{
			region: 'center'
		});

/*
//according to area.js

		this.warehousegrid.getStore().on('beforeload',function(){
    		var params = this.warehousegrid.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var area = record.area;
    		var description = record.description;
    		
			delete params.area;
			delete params.description;
    		
			if(area) params.area = area;
         	if(description) params.description = description;
    	},this);*/


		this.transactiongrid.getStore().on('beforeload',function(){
    		var params = this.transactiongrid.getStore().getProxy().extraParams;
    		var record = me.pt1f1form.getForm().getValues();

		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var lot = record.lot;
		    var lotOver = record.lotOver;

		    var lottable01 = record.lottable01;
		    var lottable01Over = record.lottable01Over;
		    var lottable02 = record.lottable02;
		    var lottable02Over = record.lottable02Over;
		    var lottable03 = record.lottable03;            
		    var lottable03Over = record.lottable03Over;

		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
		     var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.lot;
			delete params.lotOver;
            
			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;
			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;
			
			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(lot) params.lot = lot;
			if(lotOver) params.lotOver = lotOver;

			if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;            
            
			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;
    	},this);
		return this.transactiongrid;
    },
    
    //底部左边面板
    createPt1F1Form: function(){
        var me=this;
    	this.pt1f1form = Ext.create('Ext.form.Panel',{

			region: 'west',
			width:350,
			labelWidth : 80,
    		//split: true,      //form 中间的隐藏窗口的按钮，库存部分其他菜单没有，可以统一添加
			frame : true,
			border : false,
			autoScroll :true,
			resizable: true,
			collapsible : true,
			layout: 'anchor',
			buttonAlign:'center',  
            
            //以下是每个item的公共属性
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                defaults: {
							margins: '0 2 0 6'
                }
            },
    		items: [
                //  这是表头
                    {
                        items: [
                            {xtype:'label',text:'',width:60},
                            {xtype:'label',text:'从',flex: 1},
                            {xtype:'label',text:'到',flex: 1}
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'货主:',width:60},
                            {
                                name: 'storerKey',
                                flex: 1,
								allowBlank: false,
                                listeners:{
                                    blur: function(txt){
										var storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(storerKeyValue);
                                        me.pt1f1form.getForm().findField('storerKeyOver').setValue(storerKeyValue);
                                    }
                                        
                                }
                            },
                            {
                                name: 'storerKeyOver',
                                flex: 1,
								allowBlank: false,
                                listeners:{
                                    blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'SKU:',width:60},
                            {
                                name: 'sku',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
										var skuValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(skuValue);
                                        me.pt1f1form.getForm().findField('skuOver').setValue(skuValue);
                                    }                                    
                                }
                            },
                            {
                                name: 'skuOver',
                                flex: 1,
                                listeners:{
                                     blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
                                }
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'型号:',width:60},
                            {
                                name: 'model',
                                flex: 1,
                                listeners:{                        
                                    blur: function(txt){
										var modelValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(modelValue);
                                        me.pt1f1form.getForm().findField('modelOver').setValue(modelValue);
                                    }
                                }                                 
                            },
                            {
                                name: 'modelOver',
								listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},        
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'库位:',width:60},
                            {
                                name: 'loc',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
										var locValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(locValue);
                                        me.pt1f1form.getForm().findField('locOver').setValue(locValue);
                                    }                                    
                                }
                            },
                            {
                                name: 'locOver',
                                flex: 1,listeners:{
                                     blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
                                }
                            }
                        ]
                    },
                    {

                        items: [
                            {xtype:'label',text:'批次:',width:60},
                            {
                                name: 'lot',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
										var lotValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lotValue);
                                        me.pt1f1form.getForm().findField('lotOver').setValue(lotValue);
                                    },                                           
                                    scope:this
                                }
                            },
                            {
                                name: 'lotOver',
                                flex: 1,
                                listeners:{
                                     blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
                                }
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'收货日期:',width:60},
                            {	
                                xtype:'datefield',
                                name: 'lottable01',
                                format:'Y-m-d H:i:s',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
										var lottable01Value= txt.getValue();
										txt.setValue(lottable01Value);
                                        me.pt1f1form.getForm().findField('lottable01Over').setValue(lottable01Value);
                                    }
                                }
                            },
                            {	
                                xtype:'datefield',
                                name: 'lottable01Over',
                                format:'Y-m-d H:i:s',
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'生产日期:',width:60},
                            {	
                                xtype:'datefield',
                                name: 'lottable02',
                                format:'Y-m-d H:i:s',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
										var lottable02Value= txt.getValue();
										txt.setValue(lottable02Value);
                                        me.pt1f1form.getForm().findField('lottable02Over').setValue(lottable02Value);
                                    }
                                }                                
                            },
                            {	
                                xtype:'datefield',
                                name: 'lottable02Over',
                                format:'Y-m-d H:i:s',
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'失效日期:',width:60},
                            {	
                                xtype:'datefield',
                                name: 'lottable03',
                                format:'Y-m-d H:i:s',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
										var lottable03Value= txt.getValue();
										txt.setValue(lottable03Value);
                                        me.pt1f1form.getForm().findField('lottable03Over').setValue(lottable03Value);
                                    }
                                }                                  
                            },
                            {	
                                xtype:'datefield',
                                name: 'lottable03Over',
                                format:'Y-m-d H:i:s',
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'生产批号:',width:60},
                            {	
                                name: 'lottable04',
                                flex: 1,
                                listeners:{                             
                                    blur: function(txt){
										var lottable04Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable04Value);
                                        me.pt1f1form.getForm().findField('lottable04Over').setValue(lottable04Value);
                                    }
                                }  
                            },
                            {	
                                name: 'lottable04Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                                
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'托盘号:',width:60},
                            {	
                                name: 'lottable05',
                                flex: 1,
                                listeners:{                              
                                    blur: function(txt){
										var lottable05Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable05Value);
                                        me.pt1f1form.getForm().findField('lottable05Over').setValue(lottable05Value);
                                    }
                                }  
                            },
                            {	
                                name: 'lottable05Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                              
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'成品卷号:',width:60},
                            {
                                name: 'lottable06',
                                flex: 1,
                                listeners:{                              
                                    blur: function(txt){
										var lottable06Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable06Value);
                                        me.pt1f1form.getForm().findField('lottable06Over').setValue(lottable06Value);
                                    }
                                }  
                            },
                            {
                                name: 'lottable06Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                              
                                flex: 1}
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'等级:',width:60},
                            {
                                name: 'lottable07',
                                flex: 1,
                                listeners:{                               
                                    blur: function(txt){
										var lottable07Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable07Value);
                                        me.pt1f1form.getForm().findField('lottable07Over').setValue(lottable07Value);
                                    }
                                }                                  
                            },
                            {
                                name: 'lottable07Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'外观代码:',width:60},
                            {
                                name: 'lottable08',
                                flex: 1,
                                listeners:{                            
                                    blur: function(txt){
										var lottable08Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable08Value);
                                        me.pt1f1form.getForm().findField('lottable08Over').setValue(lottable08Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable08Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'表面处理:',width:60},
                            {
                                name: 'lottable09',
                                flex: 1,
                                listeners:{                               
                                    blur: function(txt){
										var lottable09Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable09Value);
                                        me.pt1f1form.getForm().findField('lottable09Over').setValue(lottable09Value);
                                    }
                                }                          
                            },
                            {
                                name: 'lottable09Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'规格:',width:60},
                            {
                                name: 'lottable10',
                                flex: 1,
                                listeners:{                            
                                    blur: function(txt){
										var lottable10Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable10Value);
                                        me.pt1f1form.getForm().findField('lottable10Over').setValue(lottable10Value);
                                    }
                                }                          
                            },
                            {
                                name: 'lottable10Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'包装形式:',width:60},
                            {
                                name: 'lottable11',
                                flex: 1,
                                listeners:{                            
                                    blur: function(txt){
										var lottable11Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable11Value);
                                        me.pt1f1form.getForm().findField('lottable11Over').setValue(lottable11Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable11Over',
                                listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},                                
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'ASN号:',width:60},
                            {
                                name: 'lottable12',
                                flex: 1,
                                listeners:{                        
                                    blur: function(txt){
										var lottable12Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable12Value);
                                        me.pt1f1form.getForm().findField('lottable12Over').setValue(lottable12Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable12Over',
								listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},        
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'反射率:',width:60},
                            {
                                name: 'lottable13',
                                flex: 1,
                                listeners:{                        
                                    blur: function(txt){
										var lottable13Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable13Value);
                                        me.pt1f1form.getForm().findField('lottable13Over').setValue(lottable13Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable13Over',
								listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},        
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'极差:',width:60},
                            {
                                name: 'lottable14',
                                flex: 1,
                                listeners:{                        
                                    blur: function(txt){
										var lottable14Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable14Value);
                                        me.pt1f1form.getForm().findField('lottable14Over').setValue(lottable14Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable14Over',
								listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},        
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:'重量:',width:60},
                            {
                                name: 'lottable15',
                                flex: 1,
                                listeners:{                        
                                    blur: function(txt){
										var lottable15Value= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lottable15Value);
                                        me.pt1f1form.getForm().findField('lottable15Over').setValue(lottable15Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable15Over',
								listeners:{
									blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
									}
								},        
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:swmslot16,width:60},
                            {
                                name: 'lottable16',
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
                                        var lottable16Value= Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(lottable16Value);
                                        me.pt1f1form.getForm().findField('lottable16Over').setValue(lottable16Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable16Over',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:swmslot17,hidden:true,width:60},
                            {
                                name: 'lottable17',
                                hidden:true,
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
                                        var lottable17Value= Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(lottable17Value);
                                        me.pt1f1form.getForm().findField('lottable17Over').setValue(lottable17Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable17Over',
                                hidden:true,
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:swmslot18,hidden:true,width:60},
                            {
                                name: 'lottable18',
                                hidden:true,
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
                                        var lottable18Value= Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(lottable18Value);
                                        me.pt1f1form.getForm().findField('lottable18Over').setValue(lottable18Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable18Over',
                                hidden:true,
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:swmslot19,hidden:true,width:60},
                            {
                                name: 'lottable19',
                                hidden:true,
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
                                        var lottable19Value= Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(lottable19Value);
                                        me.pt1f1form.getForm().findField('lottable19Over').setValue(lottable19Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable19Over',
                                hidden:true,
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },                               
                                flex: 1
                            }
                        ]
                    },
                    {
                        items: [
                            {xtype:'label',text:swmslot20,hidden:true,width:60},
                            {
                                name: 'lottable20',
                                hidden:true,
                                flex: 1,
                                listeners:{
                                    blur: function(txt){
                                        var lottable20Value= Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(lottable20Value);
                                        me.pt1f1form.getForm().findField('lottable20Over').setValue(lottable20Value);
                                    }
                                }                                 
                            },
                            {
                                name: 'lottable20Over',
                                hidden:true,
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },                               
                                flex: 1
                            }
                        ]
                    }
				]
    	});
    	return this.pt1f1form;
    },
   
   //打印按照货主查询报表
   	onPrintStorer: function(){
		var me = this;
		var record = me.pt1f1form.getForm().getValues();
  		var top = me.topform.getForm().getValues();
		if(top.showzero == ""){
    		var zeroValues='';
    	}else{
			var zeroValues=top.showzero;
		}
		var storerKey = record.storerKey;
		var storerKeyOver = record.storerKeyOver;
		
        window.location.href = basePath+'/report/printTransactionDetailStorer.action?string='+zeroValues+','+storerKey+','+storerKeyOver;
        /*	Ext.Ajax.request({
			    url: basePath + '/inventory/printTransactionDetailStorer.action',
			    params: {
                    zeroValues:top.showzero,
				    lot:record.lot,
					storerKey : record.storerKey,
		            storerKeyOver : record.storerKeyOver,
		            sku :record.sku,
		            skuOver : record.skuOver,
		            lotOver : record.lotOver,

		            lottable01 : record.lottable01,
		            lottable01Over : record.lottable01Over,
		            lottable02 : record.lottable02,
		            lottable02Over : record.lottable02Over,
		            lottable03 : record.lottable03,          
		            lottable03Over : record.lottable03Over,

		            lottable04 : record.lottable04,
		            lottable04Over : record.lottable04Over,
		            lottable05 : record.lottable05,
		            lottable05Over : record.lottable05Over,
		            lottable06 : record.lottable06,
		            lottable06Over : record.lottable06Over,
		            lottable07 : record.lottable07,
		            lottable07Over : record.lottable07Over,
		            lottable08 : record.lottable08,
		            lottable08Over : record.lottable08Over,
		            lottable09 : record.lottable09,
		            lottable09Over : record.lottable09Over,
		            lottable10 : record.lottable10,
		            lottable10Over : record.lottable10Over,
		            lottable11 : record.lottable11,
		            lottable11Over : record.lottable11Over,
		            lottable12 : record.lottable12,
		            lottable12Over : record.lottable12Over,
			    },	
                    async: false,				
			        success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {t' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
				html: "<iframe id='onPrintAsnReceip
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me)  */ 
    },		
    
    //按照货主查询grid显示总重量(Lee),后期可能会有
  
	//打印商品
	onPrintSku: function(){
		var me = this;
		var record = me.pt1f1form.getForm().getValues();
  		var top = me.topform.getForm().getValues();
		
		if(top.showzero == ""){
    		var zeroValues='';
    	}else{
			var zeroValues=top.showzero;
		}
		var storerKey =record.storerKey;
		var storerKeyOver = record.storerKeyOver;
		var sku = record.sku;
 		var skuOver = record.skuOver;
		
		window.location.href = basePath+'/report/printTransactionDetailSku.action?string='+zeroValues+','+storerKey+','+storerKeyOver+','+sku+','+skuOver;		
        /*	Ext.Ajax.request({
			    url: basePath + '/inventory/printTransactionDetailSku.action',
			    params: {
                zeroValues:top.showzero,
			    storerKey : record.storerKey,
		        storerKeyOver : record.storerKeyOver,
		        sku : record.sku,
 		        skuOver : record.skuOver,
		        lot : record.lot,
		        lotOver : record.lotOver,

		        lottable01 : record.lottable01,
		        lottable01Over : record.lottable01Over,
		        lottable02 : record.lottable02,
		        lottable02Over : record.lottable02Over,
		        lottable03 : record.lottable03,            
		        lottable03Over : record.lottable03Over,
                lottable04 : record.lottable04,
		        lottable04Over : record.lottable04Over,
		        lottable05 : record.lottable05,
		        lottable05Over : record.lottable05Over,
		        lottable06 : record.lottable06,
		        lottable06Over : record.lottable06Over,
		        lottable07 : record.lottable07,
		        lottable07Over : record.lottable07Over,
		        lottable08 : record.lottable08,
		        lottable08Over : record.lottable08Over,
		        lottable09 : record.lottable09,
		        lottable09Over : record.lottable09Over,
		        lottable10 : record.lottable10,
		        lottable10Over : record.lottable10Over,
		        lottable11 : record.lottable11,
		        lottable11Over : record.lottable11Over,
		        lottable12 : record.lottable12,
		        lottable12Over : record.lottable12Over,

			    },	
                    async: false,				
			        success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintAsnReceipt' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me)
		*/			
    	
    },		
	
    //根据Sku查询总重量(Lee)
    onQueryQtySumBySku:function(){
        var me = this;
        var record = me.pt1f1form.getForm().getValues();
        var top = me.topform.getForm().getValues();
        
        if(top.showzero == ""){
            var zeroValues='';
        }else{
            var zeroValues=top.showzero;
        }
        var storerKey =record.storerKey;
        var storerKeyOver = record.storerKeyOver;
        var sku = record.sku;
        var skuOver = record.skuOver;
        
        Ext.Ajax.request({
                    url: basePath + '/inventory/doQueryTransReportInfoSumBySku.action',
                    params: {
                        zeroValues:zeroValues,
                        storerKey:storerKey,
                        storerKeyOver:storerKeyOver,
                        sku:sku,
                        skuOver:skuOver
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            var var2sum=text.json.data[0].var2sum;
                            var var3sum = text.json.data[0].var3sum;
                            var var4sum=text.json.data[0].var4sum;
                            
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            if(null==var3sum || ""==var3sum){
                                var3sum=0;
                            }
                            if(null==var4sum || ""==var4sum){
                                var4sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1AllSum.update(var1sumHtml);
                            
                            var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2AllSum.update(var2sumHtml);
                            
                            var var3sumHtml = '<b><font color=green>'+Ext.util.Format.number(var3sum,'0,000')+'</font></b>';
                            var3AllSum.update(var3sumHtml);
                            
                            var var4sumHtml = '<b><font color=green>'+Ext.util.Format.number(var4sum,'0,000')+'</font></b>';
                            var4AllSum.update(var4sumHtml);
                            
                        }
                    }
            });  
        },
    
    
	//打印loc
	onPrintLoc: function(){
		var me = this;
		var record = me.pt1f1form.getForm().getValues();
  		var top = me.topform.getForm().getValues();
        
		if(top.showzero == ""){
    		var zeroValues='';
    	}else{
			var zeroValues=top.showzero;
		}
		var storerKey =record.storerKey;
		var storerKeyOver = record.storerKeyOver;
		var loc = record.loc;
 		var locOver = record.locOver;
		
		window.location.href = basePath+'/report/printTransactionDetailLoc.action?string='+zeroValues+','+storerKey+','+storerKeyOver+','+loc+','+locOver;		
       
		
	/*	Ext.Ajax.request({
			    url: basePath + '/inventory/printTransactionDetailLoc.action',
			    params: {
                zeroValues:top.showzero,
                storerKey : record.storerKey,
		        storerKeyOver : record.storerKeyOver,
		        sku : record.sku,
		        skuOver : record.skuOver,
		        lot : record.lot,
		        lotOver : record.lotOver,

		        lottable01 : record.lottable01,
		        lottable01Over : record.lottable01Over,
		        lottable02 : record.lottable02,
		        lottable02Over : record.lottable02Over,
		        lottable03 : record.lottable03,           
		        lottable03Over : record.lottable03Over,

		        lottable04 : record.lottable04,
		        lottable04Over : record.lottable04Over,
		        lottable05 : record.lottable05,
		        lottable05Over : record.lottable05Over,
		        lottable06 : record.lottable06,
		        lottable06Over : record.lottable06Over,
		        lottable07 : record.lottable07,
		        lottable07Over : record.lottable07Over,
		        lottable08 : record.lottable08,
		        lottable08Over : record.lottable08Over,
		        lottable09 : record.lottable09,
		        lottable09Over : record.lottable09Over,
		        lottable10 : record.lottable10,
		        lottable10Over : record.lottable10Over,
		        lottable11 : record.lottable11,
		        lottable11Over : record.lottable11Over,
		        lottable12 : record.lottable12,
		        lottable12Over : record.lottable12Over,
			    },	
                    async: false,				
			        success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintAsnReceipt' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me)
		*/			
    	
    },		
	
      //根据Lot查询总重量(Lee)
    onQueryQtySumByLoc:function(){
        var me = this;
        var record = me.pt1f1form.getForm().getValues();
        var top = me.topform.getForm().getValues();
        
        if(top.showzero == ""){
            var zeroValues='';
        }else{
            var zeroValues=top.showzero;
        }
        var storerKey =record.storerKey;
        var storerKeyOver = record.storerKeyOver;
        var loc = record.loc;
        var locOver = record.locOver;
        
        Ext.Ajax.request({
                    url: basePath + '/inventory/doQueryTransReportInfoSumByLoc.action',
                    params: {
                        zeroValues:zeroValues,
                        storerKey:storerKey,
                        storerKeyOver:storerKeyOver,
                        loc : loc,
                        locOver : locOver
                      
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            var var2sum=text.json.data[0].var2sum;
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1locAllSum.update(var1sumHtml);
                            
                            var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2locAllSum.update(var2sumHtml);
                            
                        }
                    }
            });  
        },
    
    
	//打印lot
	onPrintLot: function(){
		var me = this;
		var record = me.pt1f1form.getForm().getValues();
  		var top = me.topform.getForm().getValues();

		if(top.showzero == ""){
    		var zeroValues='';
    	}else{
			var zeroValues=top.showzero;
		}
		var storerKey =record.storerKey;
		var storerKeyOver = record.storerKeyOver;
		var sku = record.sku;
 		var skuOver = record.skuOver;
		var lot = record.lot;
		var lotOver = record.lotOver;

		var lottable01 = record.lottable01;
		var lottable01Over = record.lottable01Over;
		var lottable02 = record.lottable02;
		var lottable02Over = record.lottable02Over;
		var lottable03 = record.lottable03;            
		var lottable03Over = record.lottable03Over;
        var lottable04 = record.lottable04;
		var lottable04Over = record.lottable04Over;
		var lottable05 = record.lottable05;
		var lottable05Over = record.lottable05Over;
		var lottable06 = record.lottable06;
		var lottable06Over = record.lottable06Over;
		var lottable07 = record.lottable07;
		var lottable07Over = record.lottable07Over;
		var lottable08 = record.lottable08;
		var lottable08Over = record.lottable08Over;
		var lottable09 = record.lottable09;
		var lottable09Over = record.lottable09Over;
		var lottable10 =record.lottable10;
		var lottable10Over = record.lottable10Over;
		var lottable11 = record.lottable11;
		var lottable11Over = record.lottable11Over;
		var lottable12 = record.lottable12;
		var lottable12Over = record.lottable12Over;
		var lottable13 =record.lottable13;
		var lottable13Over = record.lottable13Over;
		var lottable14 = record.lottable14;
		var lottable14Over = record.lottable14Over;
		var lottable15 = record.lottable15;
		var lottable15Over = record.lottable15Over;
		var lottable16 = record.lottable16;
		var lottable16Over = record.lottable16Over;
		var lottable17 = record.lottable17;
		var lottable17Over = record.lottable17Over;
		var lottable18 =record.lottable18;
		var lottable18Over = record.lottable18Over;
		var lottable19 = record.lottable19;
		var lottable19Over = record.lottable19Over;
		var lottable20 = record.lottable20;
		var lottable20Over = record.lottable20Over;

		window.location.href = basePath+'/report/printTransactionDetailLot.action?string='+zeroValues+","+storerKey+","+storerKeyOver+","+sku+","+skuOver+","
										+lot+","+lotOver+","+lottable01+","+lottable01Over+","+lottable02+","+lottable02Over+","
										+lottable03+","+lottable03Over+","+lottable04+","+lottable04Over+","+lottable05+","+lottable05Over+","
										+lottable06+","+lottable06Over+","+lottable07+","+lottable07Over+","+lottable08+","+lottable08Over+","
										+lottable09+","+lottable09Over+","+lottable10+","+lottable10Over+","+lottable11+","+lottable11Over+","
										+lottable12+","+lottable12Over+","+lottable13+","+lottable13Over+","
										+lottable14+","+lottable14Over+","+lottable15+","+lottable15Over+","+lottable16+","+lottable16Over+","
										+lottable17+","+lottable17Over+","+lottable18+","+lottable18Over+","
										+lottable19+","+lottable19Over+","+lottable20+","+lottable20Over;
		
		
        /*	Ext.Ajax.request({
			    url: basePath + '/inventory/printTransactionDetailLot.action',
			    params: {
                zeroValues:top.showzero,
			    storerKey : record.storerKey,
		        storerKeyOver : record.storerKeyOver,
		        sku : record.sku,
 		        skuOver : record.skuOver,
		        lot : record.lot,
		        lotOver : record.lotOver,

		        lottable01 : record.lottable01,
		        lottable01Over : record.lottable01Over,
		        lottable02 : record.lottable02,
		        lottable02Over : record.lottable02Over,
		        lottable03 : record.lottable03,            
		        lottable03Over : record.lottable03Over,
                lottable04 : record.lottable04,
		        lottable04Over : record.lottable04Over,
		        lottable05 : record.lottable05,
		        lottable05Over : record.lottable05Over,
		        lottable06 : record.lottable06,
		        lottable06Over : record.lottable06Over,
		        lottable07 : record.lottable07,
		        lottable07Over : record.lottable07Over,
		        lottable08 : record.lottable08,
		        lottable08Over : record.lottable08Over,
		        lottable09 : record.lottable09,
		        lottable09Over : record.lottable09Over,
		        lottable10 : record.lottable10,
		        lottable10Over : record.lottable10Over,
		        lottable11 : record.lottable11,
		        lottable11Over : record.lottable11Over,
		        lottable12 : record.lottable12,
		        lottable12Over : record.lottable12Over,

			    },	
                    async: false,				
			        success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintAsnReceipt' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me)
					
    	*/
    },		
    
      //根据Lot查询总重量(Lee)
    onQueryQtySumByLot:function(){
        var me = this;
        var record = me.pt1f1form.getForm().getValues();
        var top = me.topform.getForm().getValues();

        if(top.showzero == ""){
            var zeroValues='';
        }else{
            var zeroValues=top.showzero;
        }
        var storerKey =record.storerKey;
        var storerKeyOver = record.storerKeyOver;
        var sku = record.sku;
        var skuOver = record.skuOver;
        var lot = record.lot;
        var lotOver = record.lotOver;

        var lottable01 = record.lottable01;
        var lottable01Over = record.lottable01Over;
        var lottable02 = record.lottable02;
        var lottable02Over = record.lottable02Over;
        var lottable03 = record.lottable03;            
        var lottable03Over = record.lottable03Over;
        var lottable04 = record.lottable04;
        var lottable04Over = record.lottable04Over;
        var lottable05 = record.lottable05;
        var lottable05Over = record.lottable05Over;
        var lottable06 = record.lottable06;
        var lottable06Over = record.lottable06Over;
        var lottable07 = record.lottable07;
        var lottable07Over = record.lottable07Over;
        var lottable08 = record.lottable08;
        var lottable08Over = record.lottable08Over;
        var lottable09 = record.lottable09;
        var lottable09Over = record.lottable09Over;
        var lottable10 =record.lottable10;
        var lottable10Over = record.lottable10Over;
        var lottable11 = record.lottable11;
        var lottable11Over = record.lottable11Over;
        var lottable12 = record.lottable12;
        var lottable12Over = record.lottable12Over;
        var lottable13 =record.lottable13;
        var lottable13Over = record.lottable13Over;
        var lottable14 = record.lottable14;
        var lottable14Over = record.lottable14Over;
        var lottable15 = record.lottable15;
        var lottable15Over = record.lottable15Over;
        var lottable16 = record.lottable16;
        var lottable16Over = record.lottable16Over;
        var lottable17 = record.lottable17;
        var lottable17Over = record.lottable17Over;
        var lottable18 =record.lottable18;
        var lottable18Over = record.lottable18Over;
        var lottable19 = record.lottable19;
        var lottable19Over = record.lottable19Over;
        var lottable20 = record.lottable20;
        var lottable20Over = record.lottable20Over;
        
        Ext.Ajax.request({
                    url: basePath + '/inventory/doQueryTransReportInfoSumByLot.action',
                    params: {
                        zeroValues:zeroValues,
                        storerKey:storerKey,
                        storerKeyOver:storerKeyOver,
                        sku:sku,
                        skuOver:skuOver,
                        lot : lot,
                        lotOver : lotOver,
                        lottable01: lottable01,
                        lottable01Over: lottable01Over,
                        lottable02 :lottable02,
                        lottable02Over :lottable02Over,
                        lottable03: lottable03,
                        lottable03Over: lottable03Over,
                        lottable04 :lottable04,
                        lottable04Over :lottable04Over,
                        lottable05 :lottable05,
                        lottable05Over :lottable05Over,
                        lottable06 :lottable06,
                        lottable06Over :lottable06Over,
                        lottable07 :lottable07,
                        lottable07Over :lottable07Over,
                        lottable08 :lottable08,
                        lottable08Over:lottable08Over,
                        lottable09:lottable09, 
                        lottable09Over:lottable09Over, 
                        lottable10 :lottable10,
                        lottable10Over:lottable10Over, 
                        lottable11:lottable11, 
                        lottable11Over:lottable11Over, 
                        lottable12 :lottable12,
                        lottable12Over:lottable12Over, 
                        lottable13:lottable13,
                        lottable13Over:lottable13Over, 
                        lottable14 :lottable14,
                        lottable14Over:lottable14Over, 
                        lottable15:lottable15, 
                        lottable15Over:lottable15Over,
                        lottable16:lottable16, 
                        lottable16Over:lottable16Over, 
                        lottable17 :lottable17,
                        lottable17Over:lottable17Over, 
                        lottable18:lottable18,
                        lottable18Over:lottable18Over, 
                        lottable19 :lottable19,
                        lottable19Over:lottable19Over, 
                        lottable20:lottable20, 
                        lottable20Over:lottable20Over 
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            var var2sum=text.json.data[0].var2sum;
                            var var3sum = text.json.data[0].var3sum;
                            var var4sum=text.json.data[0].var4sum;
                            
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            if(null==var3sum || ""==var3sum){
                                var3sum=0;
                            }
                            if(null==var4sum || ""==var4sum){
                                var4sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1lotAllSum.update(var1sumHtml);
                            
                            var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2lotAllSum.update(var2sumHtml);
                            
                            var var3sumHtml = '<b><font color=green>'+Ext.util.Format.number(var3sum,'0,000')+'</font></b>';
                            var3lotAllSum.update(var3sumHtml);
                            
                            var var4sumHtml = '<b><font color=green>'+Ext.util.Format.number(var4sum,'0,000')+'</font></b>';
                            var4lotAllSum.update(var4sumHtml);
                            
                        }
                    }
            });  
        },
    
	//打印LLI
	onPrintLLI: function(){
		var me = this;
		var record = me.pt1f1form.getForm().getValues();
  		var top = me.topform.getForm().getValues();

		if(top.showzero == ""){
    		var zeroValues='';
    	}else{
			var zeroValues=top.showzero;
		}
		var storerKey =record.storerKey;
		var storerKeyOver = record.storerKeyOver;
		var sku = record.sku;
 		var skuOver = record.skuOver;
		var lot = record.lot;
		var lotOver = record.lotOver;

		var loc = record.loc;
		var locOver = record.locOver;
        var model = record.model;
        var modelOver=record.modelOver;
        var specification=record.specification;
        var specificationOver=record.specificationOver;        
		
		var lottable01 = record.lottable01;
		var lottable01Over = record.lottable01Over;
		var lottable02 = record.lottable02;
		var lottable02Over = record.lottable02Over;
		var lottable03 = record.lottable03;            
		var lottable03Over = record.lottable03Over;
        var lottable04 = record.lottable04;
		var lottable04Over = record.lottable04Over;
		var lottable05 = record.lottable05;
		var lottable05Over = record.lottable05Over;
		var lottable06 = record.lottable06;
		var lottable06Over = record.lottable06Over;
		var lottable07 = record.lottable07;
		var lottable07Over = record.lottable07Over;
		var lottable08 = record.lottable08;
		var lottable08Over = record.lottable08Over;
		var lottable09 = record.lottable09;
		var lottable09Over = record.lottable09Over;
		var lottable10 =record.lottable10;
		var lottable10Over = record.lottable10Over;
		var lottable11 = record.lottable11;
		var lottable11Over = record.lottable11Over;
		var lottable12 = record.lottable12;
		var lottable12Over = record.lottable12Over;
		var lottable13 = record.lottable13;
		var lottable13Over = record.lottable13Over;
		var lottable14 = record.lottable14;
		var lottable14Over = record.lottable14Over;
		var lottable15 = record.lottable15;
		var lottable15Over = record.lottable15Over;
        var lottable16 = record.lottable16;
        var lottable16Over = record.lottable16Over;
        var lottable17 = record.lottable17;
        var lottable17Over = record.lottable17Over;
        var lottable18 =record.lottable18;
        var lottable18Over = record.lottable18Over;
        var lottable19 = record.lottable19;
        var lottable19Over = record.lottable19Over;
        var lottable20 = record.lottable20;
        var lottable20Over = record.lottable20Over;

		window.location.href = basePath+'/report/printTransactionDetailLLI.action?string='+zeroValues+","+storerKey+","+storerKeyOver+","+sku+","+skuOver+","
										+lot+","+lotOver+","+lottable01+","+lottable01Over+","+lottable02+","+lottable02Over+","
										+lottable03+","+lottable03Over+","+lottable04+","+lottable04Over+","+lottable05+","+lottable05Over+","
										+lottable06+","+lottable06Over+","+lottable07+","+lottable07Over+","+lottable08+","+lottable08Over+","
										+lottable09+","+lottable09Over+","+lottable10+","+lottable10Over+","+lottable11+","+lottable11Over+","
										+lottable12+","+lottable12Over+","+lottable13+","+lottable13Over+","+lottable14+","+lottable14Over+","
                                        +lottable15+","+lottable15Over+","+lottable16+","+lottable16Over+","+lottable17+","+lottable17Over+","
                                        +lottable18+","+lottable18Over+","+lottable19+","+lottable19Over+","+lottable20+","+lottable20Over+","
										+loc+","+locOver+","+model+","+modelOver+","+specification+","+specificationOver;

        /*	Ext.Ajax.request({
			    url: basePath + '/inventory/printTransactionDetailLLI.action',
			    params: {
                zeroValues:top.showzero,
			    storerKey : record.storerKey,
		        storerKeyOver : record.storerKeyOver,
		        sku : record.sku,
 		        skuOver : record.skuOver,
		        lot : record.lot,
		        lotOver : record.lotOver,
		        loc : record.loc,
		        locOver : record.locOver,

		        lottable01 : record.lottable01,
		        lottable01Over : record.lottable01Over,
		        lottable02 : record.lottable02,
		        lottable02Over : record.lottable02Over,
		        lottable03 : record.lottable03,            
		        lottable03Over : record.lottable03Over,
                lottable04 : record.lottable04,
		        lottable04Over : record.lottable04Over,
		        lottable05 : record.lottable05,
		        lottable05Over : record.lottable05Over,
		        lottable06 : record.lottable06,
		        lottable06Over : record.lottable06Over,
		        lottable07 : record.lottable07,
		        lottable07Over : record.lottable07Over,
		        lottable08 : record.lottable08,
		        lottable08Over : record.lottable08Over,
		        lottable09 : record.lottable09,
		        lottable09Over : record.lottable09Over,
		        lottable10 : record.lottable10,
		        lottable10Over : record.lottable10Over,
		        lottable11 : record.lottable11,
		        lottable11Over : record.lottable11Over,
		        lottable12 : record.lottable12,
		        lottable12Over : record.lottable12Over,

			    },	
                    async: false,				
			        success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintAsnReceipt' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me)
			*/		
    	
    },	
    
        //根据LLI查询总重量(Lee)
    onQueryQtySumByLLI:function(){
      var me = this;
        var record = me.pt1f1form.getForm().getValues();
        var top = me.topform.getForm().getValues();

        if(top.showzero == ""){
            var zeroValues='';
        }else{
            var zeroValues=top.showzero;
        }
        var storerKey =record.storerKey;
        var storerKeyOver = record.storerKeyOver;
        var sku = record.sku;
        var skuOver = record.skuOver;
        var lot = record.lot;
        var lotOver = record.lotOver;

        var loc = record.loc;
        var locOver = record.locOver;
        var model = record.model;
        var modelOver=record.modelOver;
        var specification=record.specification;
        var specificationOver=record.specificationOver;        
        
        var lottable01 = record.lottable01;
        var lottable01Over = record.lottable01Over;
        var lottable02 = record.lottable02;
        var lottable02Over = record.lottable02Over;
        var lottable03 = record.lottable03;            
        var lottable03Over = record.lottable03Over;
        var lottable04 = record.lottable04;
        var lottable04Over = record.lottable04Over;
        var lottable05 = record.lottable05;
        var lottable05Over = record.lottable05Over;
        var lottable06 = record.lottable06;
        var lottable06Over = record.lottable06Over;
        var lottable07 = record.lottable07;
        var lottable07Over = record.lottable07Over;
        var lottable08 = record.lottable08;
        var lottable08Over = record.lottable08Over;
        var lottable09 = record.lottable09;
        var lottable09Over = record.lottable09Over;
        var lottable10 =record.lottable10;
        var lottable10Over = record.lottable10Over;
        var lottable11 = record.lottable11;
        var lottable11Over = record.lottable11Over;
        var lottable12 = record.lottable12;
        var lottable12Over = record.lottable12Over;
        var lottable13 = record.lottable13;
        var lottable13Over = record.lottable13Over;
        var lottable14 = record.lottable14;
        var lottable14Over = record.lottable14Over;
        var lottable15 = record.lottable15;
        var lottable15Over = record.lottable15Over;
        var lottable16 = record.lottable16;
        var lottable16Over = record.lottable16Over;
        var lottable17 = record.lottable17;
        var lottable17Over = record.lottable17Over;
        var lottable18 =record.lottable18;
        var lottable18Over = record.lottable18Over;
        var lottable19 = record.lottable19;
        var lottable19Over = record.lottable19Over;
        var lottable20 = record.lottable20;
        var lottable20Over = record.lottable20Over;
        
        Ext.Ajax.request({
                    url: basePath + '/inventory/doQueryTransReportInfoSumByLLI.action',
                    params: {
                         zeroValues:zeroValues,
                        storerKey:storerKey,
                        storerKeyOver:storerKeyOver,
                        sku:sku,
                        skuOver:skuOver,
                        lot : lot,
                        lotOver : lotOver,
                        
                        loc:loc,
                        locOver:locOver,
                        model:model,
                        modelOver:modelOver,
                        specification:specification,
                        specificationOver:specificationOver,
                        
                        lottable01: lottable01,
                        lottable01Over: lottable01Over,
                        lottable02 :lottable02,
                        lottable02Over :lottable02Over,
                        lottable03: lottable03,
                        lottable03Over: lottable03Over,
                        lottable04 :lottable04,
                        lottable04Over :lottable04Over,
                        lottable05 :lottable05,
                        lottable05Over :lottable05Over,
                        lottable06 :lottable06,
                        lottable06Over :lottable06Over,
                        lottable07 :lottable07,
                        lottable07Over :lottable07Over,
                        lottable08 :lottable08,
                        lottable08Over:lottable08Over,
                        lottable09:lottable09, 
                        lottable09Over:lottable09Over, 
                        lottable10 :lottable10,
                        lottable10Over:lottable10Over, 
                        lottable11:lottable11, 
                        lottable11Over:lottable11Over, 
                        lottable12 :lottable12,
                        lottable12Over:lottable12Over, 
                        lottable13:lottable13,
                        lottable13Over:lottable13Over, 
                        lottable14 :lottable14,
                        lottable14Over:lottable14Over, 
                        lottable15:lottable15, 
                        lottable15Over:lottable15Over,
                        lottable16:lottable16, 
                        lottable16Over:lottable16Over, 
                        lottable17 :lottable17,
                        lottable17Over:lottable17Over, 
                        lottable18:lottable18,
                        lottable18Over:lottable18Over, 
                        lottable19 :lottable19,
                        lottable19Over:lottable19Over, 
                        lottable20:lottable20, 
                        lottable20Over:lottable20Over 
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            var var2sum=text.json.data[0].var2sum;
                            var var3sum=text.json.data[0].var3sum;
                            var var4sum=text.json.data[0].var4sum;
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            if(null==var3sum || ""==var3sum){
                                var3sum=0;
                            }
                            if(null==var4sum || ""==var4sum){
                                var4sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1lliAllSum.update(var1sumHtml);
                            
                            var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2lliAllSum.update(var2sumHtml);
                         
                            var var3sumHtml = '<b><font color=green>'+Ext.util.Format.number(var3sum,'0,000')+'</font></b>';
                            var3lliAllSum.update(var3sumHtml);
                            
                            var var4sumHtml = '<b><font color=green>'+Ext.util.Format.number(var4sum,'0,000')+'</font></b>';
                            var4lliAllSum.update(var4sumHtml);
                            
                        }
                    }
            });  
        },
    
    
    //跳转的grid
    onSelectClick:function(url){
        var me =this;
        //增加判断，如果货主没有输入，则不允许继续
        var storedKeyValue=me.pt1f1form.getForm().findField('storerKey').getValue();
        var storedKeyOverValue=me.pt1f1form.getForm().findField('storerKeyOver').getValue();
        if((''==storedKeyValue)||(''==storedKeyOverValue))
        {
  			MessageBox.error('错误提示','请先输入货主！');
            return;
        }
        
        //按货主显示
        if('byStorer'==url)
        {
            this.pt1p2tabpanle.setActiveTab(0);
//            this.onQueryQtySumByStorer;
            me.pt1p2f1grid.getStore().load();
        }
        //按sku
        else if('bySku'==url)
        {
            this.pt1p2tabpanle.setActiveTab(1);
              this.onQueryQtySumBySku();
            me.pt1p2f2grid.getStore().load();
        }
        //按批次
        else if('byLot'==url)
        {
            this.pt1p2tabpanle.setActiveTab(2);
            this.onQueryQtySumByLot();
            me.pt1p2f3grid.getStore().load();
        }
        //按库位
        else if('byLoc'==url)
        {
            this.pt1p2tabpanle.setActiveTab(3);
            this.onQueryQtySumByLoc();
            me.pt1p2f4grid.getStore().load();
        }
        //按ID
        else if('byLLI'==url)
        {
            this.pt1p2tabpanle.setActiveTab(4);
            this.onQueryQtySumByLLI();
            me.pt1p2f5grid.getStore().load();  
        }
    },
    
    //调用的方法
    onSelectClickPrint:function(url){
        var me =this;
        //增加判断，如果货主没有输入，则不允许继续
        var storedKeyValue=me.pt1f1form.getForm().findField('storerKey').getValue();
        var storedKeyOverValue=me.pt1f1form.getForm().findField('storerKeyOver').getValue();
        if((''==storedKeyValue)||(''==storedKeyOverValue))
        {
  			MessageBox.error('错误提示','请先输入货主！');
            return;
        }
        
        //按货主显示
        if('byStorer'==url)
        {
            this.onPrintStorer();
        }
        //按sku
        else if('bySku'==url)
        {
            this.onPrintSku();
        }
        //按批次
        else if('byLot'==url)
        {
            this.onPrintLot();
        }
        //按库位
        else if('byLoc'==url)
        {
            this.onPrintLoc();
        }
        //按LLI
        else if('byLLI'==url)
        {
            this.onPrintLLI();
        }
    },
    
    
        
     //下边几个方法没有办法单独调用到，先注释掉
     
/*    onSelectClickByStorer:function(){
        console.log('storer');
        Ext.Msg.alert('choice', 'by storer2');
    
    },
    onSelectClickBySku:function(){
        console.log('sku');
        Ext.Msg.alert('choice', 'by sku2');
    
    },*/
    
	
    saveArea: function(){

    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'transactionmanager',
	    	region:'center'
	    }]
	});
});

