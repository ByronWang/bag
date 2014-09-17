angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Inventorys', function(Orders) {
  // Might use a resource here that returns a JSON array

	var inventorys = [];
	/*
  // Some fake testing data
  var inventorys = [
        			            {  id:0,country:'韩国',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'韩国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'韩国',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'韩国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
        			            	 ]		            	
        			            },
        			            {id:1,country:'美国',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
        			            	 ]		            	
        			            },
        			            {id:2,country:'日本',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'日本',description:"",amount:3,expectedPrice:'3000',statusId:2,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'日本',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:2,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:2,status:"买手已接单"}
        			            	 ]		            	
        			            }
        		  ];

*/
  return {
    all: function() {
    	inventorys = [];
    	angular.forEach(Orders.all(),function(order){
    		
    		var items = [];
        	angular.forEach(order.Items,function(item){
        		if(item.statusId == 1){
        			items.push(item);
        			if(!item.suitors){
        				item.suitors = [];
        			}
        		}
        	});
        	
        	if(items.length>0){
        		var orderCopy = angular.copy(order);
        		orderCopy.Items = items;
            	inventorys.push(orderCopy);
        	}
    	});
      return inventorys;
    },
    get: function(inventoryId) {
    	if(inventorys.length<1){
    		this.all();
    	}
	      // Simple index lookup
	      return inventorys[inventoryId];
	    },
  getItem: function(inventoryId,itemId) {
	      // Simple index lookup
	      return inventorys[inventoryId].Items[itemId];
	    }
  };
})

.factory('Category', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var categories = [
{id:1,name:'个护化妆',level:1,parentID:0,icon:'icon-gehuhuazhuang01'},
{id:2,name:'面部护理',level:2,parentID:1},
{id:3,name:'洁面',level:3,parentID:2},
{id:4,name:'化妆水',level:3,parentID:2},
{id:5,name:'精华',level:3,parentID:2},
{id:6,name:'面霜乳液',level:3,parentID:2},
{id:7,name:'眼霜',level:3,parentID:2},
{id:8,name:'面膜',level:3,parentID:2},
{id:9,name:'洗发护发',level:2,parentID:1},
{id:10,name:'洗发',level:3,parentID:9},
{id:11,name:'护发',level:3,parentID:9},
{id:12,name:'染发',level:3,parentID:9},
{id:13,name:'假发',level:3,parentID:9},
{id:14,name:'造型',level:3,parentID:9},
{id:15,name:'身体护肤',level:2,parentID:1},
{id:16,name:'沐浴',level:3,parentID:15},
{id:17,name:'润肤',level:3,parentID:15},
{id:18,name:'纤体塑型',level:3,parentID:15},
{id:19,name:'口腔护理',level:2,parentID:1},
{id:20,name:'牙膏/牙粉',level:3,parentID:20},
{id:21,name:'牙线/牙刷',level:3,parentID:20},
{id:22,name:'漱口水',level:3,parentID:20},
{id:23,name:'女性护理',level:2,parentID:1},
{id:24,name:'脱毛膏',level:3,parentID:24},
{id:25,name:'卫生巾',level:3,parentID:24},
{id:26,name:'彩妆',level:2,parentID:1},
{id:27,name:'睫毛膏',level:3,parentID:26},
{id:28,name:'粉饼',level:3,parentID:26},
{id:29,name:'隔离霜',level:3,parentID:26},
{id:30,name:'BB霜',level:3,parentID:26},
{id:31,name:'眉笔',level:3,parentID:26},
{id:32,name:'眼影',level:3,parentID:26},
{id:33,name:'腮红',level:3,parentID:26},
{id:34,name:'唇膏/彩',level:3,parentID:26},
{id:35,name:'香水',level:2,parentID:1},
{id:36,name:'珠宝饰品',level:1,parentID:0,icon:'icon-icon10592'},
{id:37,name:'金饰',level:2,parentID:36},
{id:38,name:'银饰',level:2,parentID:36},
{id:39,name:'钻石',level:2,parentID:36},
{id:40,name:'铂金',level:2,parentID:36},
{id:41,name:'翡翠玉石',level:2,parentID:36},
{id:42,name:'水晶玛瑙',level:2,parentID:36},
{id:43,name:'珍珠',level:2,parentID:36},
{id:44,name:'电脑办公',level:1,parentID:0,icon:'icon-diannao'},
{id:45,name:'电脑',level:2,parentID:44},
{id:46,name:'平',level:3,parentID:45},
{id:47,name:'笔',level:3,parentID:45},
{id:48,name:'台',level:3,parentID:45},
{id:49,name:'电脑配件',level:2,parentID:44},
{id:50,name:'网络产品',level:2,parentID:44},
{id:51,name:'办公打印',level:2,parentID:44},
{id:52,name:'办公文仪',level:2,parentID:44},
{id:53,name:'数码',level:1,parentID:0,icon:'icon-shuma'},
{id:54,name:'手机',level:2,parentID:53},
{id:55,name:'摄影摄像',level:2,parentID:53},
{id:56,name:'便携式相机',level:3,parentID:55},
{id:57,name:'单反相机',level:3,parentID:55},
{id:58,name:'DV机',level:3,parentID:55},
{id:59,name:'望远镜',level:3,parentID:55},
{id:60,name:'镜头',level:3,parentID:55},
{id:61,name:'滤镜',level:3,parentID:55},
{id:62,name:'闪光灯',level:3,parentID:55},
{id:63,name:'数码配件',level:2,parentID:53},
{id:64,name:'蓝牙/耳机',level:3,parentID:63},
{id:65,name:'存储卡',level:3,parentID:63},
{id:66,name:'三脚架/云台',level:3,parentID:63},
{id:67,name:'电池/电源',level:3,parentID:63},
{id:68,name:'智能设备',level:2,parentID:68},
{id:69,name:'智能手环',level:3,parentID:68},
{id:70,name:'智能眼镜',level:3,parentID:68},
{id:71,name:'运动跟踪器',level:3,parentID:68},
{id:72,name:'健康监测',level:3,parentID:68},
{id:73,name:'智能配饰',level:3,parentID:68},
{id:74,name:'智能家居',level:3,parentID:68},
{id:75,name:'体感车',level:3,parentID:68},
{id:76,name:'电子教育',level:2,parentID:53},
{id:77,name:'电子词典',level:3,parentID:76},
{id:78,name:'电纸书',level:3,parentID:76},
{id:79,name:'复读机',level:3,parentID:76},
{id:80,name:'点读机/笔',level:3,parentID:76},
{id:81,name:'学生平板',level:3,parentID:76},
{id:82,name:'早教机',level:3,parentID:76},
{id:83,name:'乐器',level:2,parentID:53},
{id:84,name:'表',level:2,parentID:53},
{id:85,name:'石英表/电子表',level:3,parentID:84},
{id:86,name:'机械表',level:3,parentID:84},
{id:87,name:'小家电',level:2,parentID:53},
{id:88,name:'电话机',level:3,parentID:87},
{id:89,name:'游戏机',level:3,parentID:87},
{id:90,name:'便携式影音设备',level:2,parentID:53},
{id:91,name:'电视摄像机',level:3,parentID:90},
{id:92,name:'录音笔/机',level:3,parentID:90},
{id:93,name:'收音机',level:3,parentID:90},
{id:94,name:'Mp3播放器',level:3,parentID:90},
{id:95,name:'Mp4播放器',level:3,parentID:90},
{id:96,name:'鞋靴',level:1,parentID:0,icon:'icon-shishangfushi'},
{id:97,name:'布鞋',level:2,parentID:96},
{id:98,name:'皮鞋',level:2,parentID:96},
{id:99,name:'凉拖',level:2,parentID:96},
{id:100,name:'休闲鞋',level:2,parentID:96},
{id:101,name:'旅游鞋',level:2,parentID:96},
{id:102,name:'定制鞋',level:2,parentID:96},
{id:103,name:'服装服饰',level:1,parentID:0,icon:'icon-fuzhuangfushi'},
{id:104,name:'男装',level:2,parentID:103},
{id:105,name:'女装',level:2,parentID:103},
{id:106,name:'童装',level:2,parentID:103},
{id:107,name:'潮服',level:2,parentID:103},
{id:108,name:'内衣',level:2,parentID:103},
{id:109,name:'帽子',level:2,parentID:103},
{id:110,name:'丝巾/头巾/围巾',level:2,parentID:103},
{id:111,name:'领带',level:2,parentID:103},
{id:112,name:'腰带',level:2,parentID:103},
{id:113,name:'手套',level:2,parentID:103},
{id:114,name:'皮革箱包',level:1,parentID:0,icon:'icon-xiangbaopiju01'},
{id:115,name:'皮革服装',level:2,parentID:114},
{id:116,name:'皮革配饰',level:2,parentID:114},
{id:117,name:'皮帽',level:3,parentID:116},
{id:118,name:'皮带',level:3,parentID:116},
{id:119,name:'皮手套',level:3,parentID:116},
{id:120,name:'包',level:2,parentID:114},
{id:121,name:'双肩包',level:2,parentID:114},
{id:122,name:'钱包',level:2,parentID:114},
{id:123,name:'旅行包',level:2,parentID:114},
{id:124,name:'拉杆箱',level:2,parentID:114},
{id:125,name:'家用百货',level:1,parentID:0,icon:'icon-huiliuquriyongbaihuo'},
{id:126,name:'食品',level:2,parentID:125},
{id:127,name:'休闲零食',level:3,parentID:126},
{id:128,name:'粮油',level:3,parentID:126},
{id:129,name:'水产品',level:3,parentID:126},
{id:130,name:'奶粉',level:3,parentID:126},
{id:131,name:'调味品',level:3,parentID:126},
{id:132,name:'饮料',level:2,parentID:125},
{id:133,name:'茶',level:3,parentID:132},
{id:134,name:'牛奶',level:3,parentID:132},
{id:135,name:'咖啡',level:3,parentID:132},
{id:136,name:'其他',level:3,parentID:132},
{id:137,name:'厨具',level:2,parentID:125},
{id:138,name:'刀具',level:3,parentID:137},
{id:139,name:'餐具',level:3,parentID:137},
{id:140,name:'锅具/壶具',level:3,parentID:137},
{id:141,name:'茶具',level:3,parentID:137},
{id:142,name:'家具',level:2,parentID:125},
{id:143,name:'沙发',level:3,parentID:142},
{id:144,name:'床垫',level:3,parentID:142},
{id:145,name:'置物架',level:3,parentID:142},
{id:146,name:'柜子',level:3,parentID:142},
{id:147,name:'家居装饰',level:2,parentID:125},
{id:148,name:'装饰布艺',level:3,parentID:147},
{id:149,name:'装饰画',level:3,parentID:147},
{id:150,name:'墙贴',level:3,parentID:147},
{id:151,name:'摆件',level:3,parentID:147},
{id:152,name:'家纺',level:2,parentID:125},
{id:153,name:'毛毯、被子、床罩、睡袋',level:3,parentID:152},
{id:154,name:'枕头、床单、毛巾被、被套',level:3,parentID:152},
{id:155,name:'地毯',level:3,parentID:152},
{id:156,name:'窗帘',level:3,parentID:152},
{id:157,name:'生活电器',level:1,parentID:0,icon:'icon-xiyiji'},
{id:158,name:'大家电',level:2,parentID:157},
{id:159,name:'空调',level:3,parentID:158},
{id:160,name:'冰箱',level:3,parentID:158},
{id:161,name:'洗衣机',level:3,parentID:158},
{id:162,name:'热水器',level:3,parentID:158},
{id:163,name:'厨房电器',level:2,parentID:157},
{id:164,name:'锅电饭煲',level:3,parentID:163},
{id:165,name:'面包机',level:3,parentID:163},
{id:166,name:'咖啡机',level:3,parentID:163},
{id:167,name:'微波炉',level:3,parentID:163},
{id:168,name:'榨汁机',level:3,parentID:163},
{id:169,name:'电烤箱',level:3,parentID:163},
{id:170,name:'电磁炉',level:3,parentID:163},
{id:171,name:'煮蛋器',level:3,parentID:163},
{id:172,name:'酸奶机',level:3,parentID:163},
{id:173,name:'电水壶',level:3,parentID:163},
{id:174,name:'果蔬解毒机',level:3,parentID:163},
{id:175,name:'其它厨房电器',level:3,parentID:163},
{id:176,name:'居家电器',level:2,parentID:157},
{id:177,name:'空气净化器',level:3,parentID:176},
{id:178,name:'电风扇',level:3,parentID:176},
{id:179,name:'吸尘器',level:3,parentID:176},
{id:180,name:'电熨斗',level:3,parentID:176},
{id:181,name:'加湿器',level:3,parentID:176},
{id:182,name:'除湿机',level:3,parentID:176},
{id:183,name:'个护电器',level:2,parentID:157},
{id:184,name:'电子秤',level:3,parentID:183},
{id:185,name:'电动理发器',level:3,parentID:183},
{id:186,name:'美发器',level:3,parentID:183},
{id:187,name:'医疗保健',level:1,parentID:0,icon:'icon-yiliao1'},
{id:188,name:'家用医疗器材',level:2,parentID:187},
{id:189,name:'家用保健器材',level:2,parentID:187},
{id:190,name:'家用美容器材',level:2,parentID:187},
{id:191,name:'传统滋补',level:2,parentID:187},
{id:192,name:'营养保健',level:2,parentID:187},
{id:193,name:'体育用品',level:1,parentID:0,icon:'icon-zuqiu'},
{id:194,name:'运动器具',level:2,parentID:193},
{id:195,name:'多功能健身器具',level:2,parentID:193},
{id:196,name:'车具',level:2,parentID:193},
{id:197,name:'高尔夫球及球具',level:2,parentID:193},
{id:198,name:'母婴用品',level:1,parentID:0,icon:'icon-muying'},
{id:199,name:'婴儿尿裤',level:2,parentID:198},
{id:200,name:'奶粉',level:2,parentID:198},
{id:201,name:'营养辅食',level:2,parentID:198},
{id:202,name:'喂养洗护',level:2,parentID:198},
{id:203,name:'婴儿服装',level:2,parentID:198},
{id:204,name:'妈妈用品',level:2,parentID:198},
{id:205,name:'寝具家具',level:2,parentID:198},
{id:206,name:'烟酒',level:1,parentID:0,icon:'icon-jiu'},
{id:207,name:'烟',level:2,parentID:206},
{id:208,name:'酒',level:2,parentID:206},
{id:209,name:'其他物品',level:1,parentID:0,icon:'icon-gengduo'},
{id:210,name:'艺术品、收藏品',level:2,parentID:209},
{id:211,name:'邮票',level:2,parentID:209}
	  ];

	  var cat1 = [];
	  
	 var colors =[ "#6cc143","#f5c132" ,"#fd8e35" ,"#ff565b" ,"#fe8864" ,"#42bde8" ,"#7b7ad7" ,"#f8cc58" ,"#fd8e35" ,"#f5c132" ,"#da70d6"];
	  
	  angular.forEach(categories,function(c){
		  if(c.level == 1){
			  cat1.push(c);
		  }
	  });
	  
	  var index = 0;
	  var ncat = [];
	  var nscat = [];
	  ncat.push(nscat);
	  
	  angular.forEach(cat1,function(c){
		  c.color = colors[index];
		  
		  if(index < colors.length){
			  index = index + 1;			  
		  }else{
			  index = 0;
		  }
		  
		  if(nscat.length>=4){
			  nscat = [];
			  ncat.push(nscat);
		  }
		  nscat.push(c);
	  });
	  
	  return {
		    all: function() {
			      return categories;
			},
			level1Grouped: function() {
			      return ncat;
			    },
	    level1: function() {
		      return cat1;
		    },
	    get: function(id) {
	      // Simple index lookup
	      return categories[id-1];
	    },
	    children: function(id) {
	    	var cren = [];
	  	  angular.forEach(categories,function(c){
			  if(c.parentID == id){
				  cren.push(c);
			  }
		    });
	  	  
		      // Simple index lookup
		      return cren;
		    }
	  };
})


.factory('Countries', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var countries = [
		{id:1,name:'美国',},
		{id:2,name:'韩国'},
		{id:3,name:'日本'},
		{id:3,name:'英国'},
		{id:3,name:'德国'}
	  ];

	  return {
	    all: function() {
	      return countries;
	    },
	    get: function(id) {
	      // Simple index lookup
	      return countries[id-1];
	    }
	  };
})


.factory('DeliveryMethods', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var methods = [
		{id:1,name:'邮寄',},
		{id:2,name:'买手选定'}
	  ];

	  return {
	    all: function() {
	      return methods;
	    },
	    get: function(id) {
	      // Simple index lookup
	      return methods[id-1];
	    }
	  };
})

.factory('Products', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var products = [
	    { id: 0, name: 'Scruff McGruff',country:'法国',category:1,price:500},
	    { id: 1, name: 'G.I. Joe' ,country:'日本',category:2,price:500},
	    { id: 2, name: 'Miss Frizzle' ,country:'美国',category:3,price:500},
	    { id: 3, name: 'Ash Ketchum' ,country:'法国',category:4,price:5000},
	    { id: 4, name: 'Scruff McGruff',country:'法国',category:1,price:500},
	    { id: 5, name: 'G.I. Joe' ,country:'日本',category:2,price:500},
	    { id: 6, name: 'Miss Frizzle' ,country:'美国',category:3,price:500},
	    { id: 7, name: 'Ash Ketchum' ,country:'法国',category:4,price:5000}
	  ];

	  return {
	    all: function() {
	      return products;
	    },
	    byCategory: function(categoryId) {	  
	    	var cat = [];
	    	angular.forEach(products,function(c){
				  if(c.category == categoryId){
					  cat.push(c);
				  }
	    	});
		      return cat;
		    },
	    get: function(productId) {
	      // Simple index lookup
	      return products[productId];
	    }
	  };
	})
	
	
	
	.factory('Orders', function() {
		  // Might use a resource here that returns a JSON array

		  // Some fake testing data
		  var orders = [
			            {  id:0,country:'韩国',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
			            	 ]		            	
			            },
			            {id:1,country:'美国',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
			            	 ]		            	
			            },
			            {id:2,country:'日本',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:2,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:2,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:2,status:"买手已接单"}
			            	 ]		            	
			            }
		  ];

		  return {
		    all: function() {
		      return orders;
		    },
		    get: function(orderId) {
			      // Simple index lookup
			      return orders[orderId];
			    },
		    add: function(order) {
		    	  orders.push(order);
		    	  order.id = orders.length-1;
			    	angular.forEach(order.Items,function(i){
			    		i.statusId = 1;
			    	});
		    	  
			      return order.id;
			    },
			done: function(item,statusId,actionId,params){
				if(!params){params={};}
				
				params.statusId = statusId;
				params.actionId = actionId;
				params.timestamp = new Date();
		    	if(!item.actions){
		    		item.actions = [];
		    	}		    	
		    	item.actions.push(params);
		    	item.current = params;
			},
		    getItem: function(orderId,itemId) {
		    	var item = orders[orderId].Items[itemId];
		    	if(!item.actions){
		    		item.actions = [];
		    		item.current ={
		    				statusId :1
		    		}; 
		    	}else if(item.actions.length>0){
		    		item.current =item.actions[item.actions.length-1];
		    	}else{
		    		item.current ={
		    				statusId :1
		    		}; 		
		    	}		    	
			    return item;
			},
			   StatusType : {
			  		    bid : 1,
			  		    purchasing : 2,
			  		    delivering : 4 ,
			  		    completed : 5 
			    },
		  };
		})
	
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    },
    DestinationType : {
  		    DATA_URL : 0,      // Return image as base64-encoded string
  		    FILE_URI : 1,      // Return image file URI
  		    NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
    },
    PictureSourceType : {
  		    PHOTOLIBRARY : 0,
  		    CAMERA : 1,
  		    SAVEDPHOTOALBUM : 2
  	}
  }
}])

.factory('Address', function($http) {
	var provinces  = [];
	  // Might use a resource here that returns a JSON array
	$http.get('js/ProvinceAndCityJson.json').then(function(resp) {
	    console.log('Success', resp);
	    provinces = resp.data;
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  });
	 
	  return {
		  provinces: function(){
			  return provinces;
		  },
		  cities: function(province){
			  
		  }		  
	  }
})

.factory('LoginUser', function($ionicModal,Users) {
	  // Might use a resource here that returns a JSON array

	 var defaultUser = {
			 isLogin : false,
			 isPurchase:false,
			 username: "未登录"
	 };
	 
	  return {
		isLogin :false,
		isPurchase : false,
	    needLogin:function($scope){	    
	    	if(!this.isLogin){
	    		$scope.user = {};
	    		$ionicModal.fromTemplateUrl('templates/modal-login.html', {
	    		    scope: $scope,
	    		    animation: 'slide-in-up'
	    		  }).then(function(modal) {
	    		    $scope.modal = modal;
	    		    $scope.modal.show();
	    		    return;
	    		  });
	    		  $scope.openModal = function() {
	    		    $scope.modal.show();
	    		  };
	    		  $scope.closeModal = function() {
	    		    $scope.modal.hide();
	    		  };
	    	}
	    },
	    login: function(username,pwd){
	    	var user = Users.get(username);
	    	if(user){
		    	angular.extend(this,user);
		    	this.isLogin = true;
		    	return true;	    		
	    	}else{
	    		return false;
	    	}
	    },
	    logoff: function(){
	    	angular.extend(this,defaultUser);
	    }
	  };
	})
	.factory('Users', function() {
		  // Might use a resource here that returns a JSON array

		  // Some fake testing data
		  var users = [
        	    { id: 0, username: 'wangshilian',password:'1234567',nickname:"alian",avatarPath:"",isPurchase:true},
        	    { id: 1, username: 'jihua',password:'1234567',nickname:"alian",avatarPath:"",isPurchase:false},
        	    { id: 2, username: 'liubo',password:'1234567',nickname:"alian",avatarPath:"",isPurchase:false}
		  ];

		  return {
		    all: function() {
		      return users;
		    },
		    get: function(username) {
		    	var user;
		    	angular.forEach(users,function(u){
		    		if(angular.equals(u.username,username)){
		    			user =  u;
		    		}
		    	});
		      // Simple index lookup
		      return user;
		    }
		  };
		})
				
	.factory('Cart', function($ionicModal) {
		return {
				cnt:0,
				Countrys:[],
				
				size:function(){
					var len =0;
					angular.forEach(this.Countrys,function(o){
						len = len + o.Items.length;
					});
					return len;
				},
				
				add : function(order){
					var hasExist = false;

					var country;

					angular.forEach(this.Countrys,function(o){
						if(o.name == order.country){
							country = o;
						}
					});
					
					if(country){
						angular.forEach(country.Items,function(o){
							if(o.id == order.id){
								hasExist = true;
							}
						});
						if(hasExist){
							order.amount = order.amount + 1;
						}else{
							order.amount = 1;
							country.Items.push(order);	
						}			
					}else{
						var country = {
								name: order.country,
								Items:[]
						};			
						country.Items.push(order);
						this.Countrys.push(country);
					}
				},
				edit : function($scope){
					  $ionicModal.fromTemplateUrl('templates/modal-orders-cart.html', {
					    scope: $scope,
					    animation: 'slide-in-up'
					  }).then(function(modal) {
					    $scope.modal = modal;
					    $scope.modal.show();
					  });
					
					  $scope.openModal = function() {
					    $scope.modal.show();
					  };
					  
					  $scope.closeModal = function() {	    			  
					    $scope.modal.hide();
					  };	
				}
		};
		
		})
		;
