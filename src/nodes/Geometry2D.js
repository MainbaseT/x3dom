/*
 * X3DOM JavaScript Library
 * http://x3dom.org
 *
 * (C)2009 Fraunhofer Insitute for Computer
 *         Graphics Reseach, Darmstadt
 * Dual licensed under the MIT and GPL.
 *
 * Based on code originally provided by
 * Philip Taylor: http://philip.html5.org
 */
 
/* ### Arc2D ### */
x3dom.registerNodeType(
    "Arc2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.Arc2D.superClass.call(this, ctx);

            this.addField_SFFloat(ctx, 'endAngle', 1.570796);
            this.addField_SFFloat(ctx, 'radius', 1);
            this.addField_SFFloat(ctx, 'startAngle', 0);
			this.addField_SFFloat(ctx, 'subdivision', 32);
            this.addField_SFBool(ctx, 'lit', false);
			
			
			var r = this._vf.radius;
			var start = this._vf.startAngle;
			var end = this._vf.endAngle;
			
			
			var geoCacheID = 'Arc2D_'+r;

			if (x3dom.geoCache[geoCacheID] != undefined) {
				x3dom.debug.logInfo("Using Arc2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			} else {
				
       			var anzahl = this._vf.subdivision;
				var t = (end - start) / anzahl;
				var theta = start;
				
				for (var i = 0; i <= anzahl +1; i++) {
					var x = Math.cos(theta) * r;
					var y = Math.sin(theta) * r;
			
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
					theta += t;
				}
										
				for (var j = 0; j < anzahl; j++) {
					this._mesh._indices[0].push(j);
					this._mesh._indices[0].push(j + 1);		
				}
					
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;

				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				this._mesh._positions[0] = [];
				this._mesh._indices[0] =[];
					
                var r = this._vf.radius;
				var start = this._vf.startAngle;
				var end = this._vf.endAngle;
                var anzahl = this._vf.subdivision;
				
				var t = (end - start) / anzahl;
				var theta = start;
					
				for (var i = 0; i <= anzahl +1; i++) {
					var x = Math.cos(theta) * r;
					var y = Math.sin(theta) * r;
				
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
					theta += t;
				}
											
				for (var j = 0; j < anzahl; j++) {
					this._mesh._indices[0].push(j);
					this._mesh._indices[0].push(j + 1);		
				}
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
					   
				Array.forEach(this._parentNodes, function (node) {
                   	node._dirty.positions = true;
                });}
        }
    )
);

/* ### ArcClose2D ### */
x3dom.registerNodeType(
    "ArcClose2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.ArcClose2D.superClass.call(this, ctx);

            this.addField_SFString(ctx, 'closureType', "PIE");
            this.addField_SFFloat(ctx, 'endAngle', 1.570796);
            this.addField_SFFloat(ctx, 'radius', 1);
            this.addField_SFFloat(ctx, 'startAngle', 0);
			this.addField_SFFloat(ctx, 'subdivision', 32);
            this.addField_SFBool(ctx, 'solid', false);
            this.addField_SFBool(ctx, 'lit', true);
			
			var r = this._vf.radius;
			var start = this._vf.startAngle;
			var end = this._vf.endAngle;
			
			
			var geoCacheID = 'ArcClose2D_'+r+start;

			if (x3dom.geoCache[geoCacheID] != undefined) {
				x3dom.debug.logInfo("Using ArcClose2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			} else {
				var anzahl = this._vf.subdivision;
				var t = (end - start) / anzahl;
				var theta = start;
					
				if(this._vf.closureType == 'PIE') {
					
					this._mesh._positions[0].push(0.0);
					this._mesh._positions[0].push(0.0);
					this._mesh._positions[0].push(0.0);
					
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(1);
					
					this._mesh._texCoords[0].push(0.5);
					this._mesh._texCoords[0].push(0.5);
					
					for (var i = 0; i <= anzahl; i++) {
						var x = Math.cos(theta) * r;
						var y = Math.sin(theta) * r;
					
						this._mesh._positions[0].push(x);
						this._mesh._positions[0].push(y);
						this._mesh._positions[0].push(0.0);
							
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(1);
							
						this._mesh._texCoords[0].push((x + r)/(2 * r));
						this._mesh._texCoords[0].push((y + r)/(2 * r));
										
						theta += t;
					}
												
					for (var j = 1; j <= anzahl; j++) {
						this._mesh._indices[0].push(j);
						this._mesh._indices[0].push(0);
						this._mesh._indices[0].push(j + 1);		
					}
					
				} else {
					for (var i = 0; i <= anzahl; i++) {
						var x = Math.cos(theta) * r;
						var y = Math.sin(theta) * r;
					
						this._mesh._positions[0].push(x);
						this._mesh._positions[0].push(y);
						this._mesh._positions[0].push(0.0);
							
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(1);
							
						this._mesh._texCoords[0].push((x + r)/(2 * r));
						this._mesh._texCoords[0].push((y + r)/(2 * r));
						theta += t;
					}
					
					var x = (this._mesh._positions[0][0] + this._mesh._positions[0][ this._mesh._positions[0].length - 3]) /2;
					var y = (this._mesh._positions[0][1] + this._mesh._positions[0][ this._mesh._positions[0].length - 2]) /2;
					
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
					
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(1);
					
					this._mesh._texCoords[0].push((x + r)/(2 * r));
					this._mesh._texCoords[0].push((y + r)/(2 * r));
					
					for (var j = 0; j < anzahl; j++) {
						this._mesh._indices[0].push(j);
						this._mesh._indices[0].push(anzahl + 1);
						this._mesh._indices[0].push(j + 1);		
					}	
				}
				
				this._mesh._numTexComponents = 2;
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
					
				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				this._mesh._positions[0] = [];
				this._mesh._indices[0] =[];
				this._mesh._normals[0] = [];
				this._mesh._texCoords[0] = [];
					
                var r = this._vf.radius;
				var start = this._vf.startAngle;
				var end = this._vf.endAngle;
				var anzahl = this._vf.subdivision;
				var t = (end - start) / anzahl;
				var theta = start;
				
				if(this._vf.closureType == 'PIE') {
					
					this._mesh._positions[0].push(0.0);
					this._mesh._positions[0].push(0.0);
					this._mesh._positions[0].push(0.0);
					
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(1);
					
					this._mesh._texCoords[0].push(0.5);
					this._mesh._texCoords[0].push(0.5);
					
					for (var i = 0; i <= anzahl; i++) {
						var x = Math.cos(theta) * r;
						var y = Math.sin(theta) * r;
					
						this._mesh._positions[0].push(x);
						this._mesh._positions[0].push(y);
						this._mesh._positions[0].push(0.0);
							
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(1);
							
						this._mesh._texCoords[0].push((x + r)/(2 * r));
						this._mesh._texCoords[0].push((y + r)/(2 * r));
										
						theta += t;
					}
												
					for (var j = 1; j <= anzahl; j++) {
						this._mesh._indices[0].push(j);
						this._mesh._indices[0].push(0);
						this._mesh._indices[0].push(j + 1);		
					}
					
				} else {
					for (var i = 0; i <= anzahl; i++) {
						var x = Math.cos(theta) * r;
						var y = Math.sin(theta) * r;
					
						this._mesh._positions[0].push(x);
						this._mesh._positions[0].push(y);
						this._mesh._positions[0].push(0.0);
							
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(0);
						this._mesh._normals[0].push(1);
							
						this._mesh._texCoords[0].push((x + r)/(2 * r));
						this._mesh._texCoords[0].push((y + r)/(2 * r));
						theta += t;
					}
					
					var x = (this._mesh._positions[0][0] + this._mesh._positions[0][ this._mesh._positions[0].length - 3]) /2;
					var y = (this._mesh._positions[0][1] + this._mesh._positions[0][ this._mesh._positions[0].length - 2]) /2;
					
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
					
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(1);
					
					this._mesh._texCoords[0].push((x + r)/(2 * r));
					this._mesh._texCoords[0].push((y + r)/(2 * r));
					
					for (var j = 0; j < anzahl; j++) {
						this._mesh._indices[0].push(j);
						this._mesh._indices[0].push(anzahl + 1);
						this._mesh._indices[0].push(j + 1);
					}	
				}
				
				this._mesh._numTexComponents = 2;
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
					   
				Array.forEach(this._parentNodes, function (node) {
                   	node._dirty.positions = true;
					node._dirty.colors = true;
                });
			}
        }
    )
);

/* ### Circle2D ### */
x3dom.registerNodeType(
    "Circle2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.Circle2D.superClass.call(this, ctx);

            this.addField_SFFloat(ctx, 'radius', 1);
			this.addField_SFFloat(ctx, 'subdivision', 32);
            this.addField_SFBool(ctx, 'lit', false);
			
			
			var r = this._vf.radius;
			
			var geoCacheID = 'Circle2D_'+r;

			if (x3dom.geoCache[geoCacheID] != undefined) {
				x3dom.debug.logInfo("Using Circle2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			} else {
				
       			 var anzahl = this._vf.subdivision;
				
				for (var i=0; i <= anzahl; i++) {
					var theta = i * ((2*Math.PI) / anzahl);
		 
					var x = Math.cos(theta) * r;
					var y = Math.sin(theta) * r;
		
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
				}
				

				for (i = 0; i < anzahl; i++) {
					this._mesh._indices[0].push(i);
					if((i + 1) == anzahl) {
						this._mesh._indices[0].push(0);
					} else {
						this._mesh._indices[0].push(i + 1);
					}			
				}
				
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;

				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				var r = this._vf.radius;
                var anzahl = this._vf.subdivision;
				
				this._mesh._positions[0] = [];
				this._mesh._indices[0] =[];
					
				for (var i=0; i <= anzahl; i++) {
					var theta = i * ((2*Math.PI) / anzahl);
			 			
					var x = Math.cos(theta) * r;
					var y = Math.sin(theta) * r;
						
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
				}
					
				for (i = 0; i < anzahl; i++) {
					this._mesh._indices[0].push(i);
					if((i + 1) == anzahl) {
						this._mesh._indices[0].push(0);
					} else {
						this._mesh._indices[0].push(i + 1);
					}			
				}
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
					   
				Array.forEach(this._parentNodes, function (node) {
                   	node._dirty.positions = true;
                });	
			}
        }
    )
);

/* ### Disk2D ### */
x3dom.registerNodeType(
    "Disk2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.Disk2D.superClass.call(this, ctx);

            this.addField_SFFloat(ctx, 'innerRadius', 0);
            this.addField_SFFloat(ctx, 'outerRadius', 1);
            this.addField_SFBool(ctx, 'solid', false);
            this.addField_SFBool(ctx, 'lit', true);
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {}
        }
    )
);

/* ### Polyline2D ### */
x3dom.registerNodeType(
    "Polyline2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.Polyline2D.superClass.call(this, ctx);

            this.addField_MFVec2f(ctx, 'lineSegments', []);
            this.addField_SFBool(ctx, 'lit', false);
			
			var x = this._vf.lineSegments[0].x;
			var y = this._vf.lineSegments[0].y;
         	
			var geoCacheID = 'Polyline2D_'+x+'-'+y;

			if( x3dom.geoCache[geoCacheID] != undefined )
			{
				x3dom.debug.logInfo("Using Polyline2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			}
			else
			{
				for (var i = 0; i < this._vf.lineSegments.length ; i++) {
					x = this._vf.lineSegments[i].x;
					y = this._vf.lineSegments[i].y;
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
				}
				for (var j = 0; j < this._vf.lineSegments.length-1; j++) {
					this._mesh._indices[0].push(j);
					this._mesh._indices[0].push(j + 1);		
				}
				
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;

				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				this._mesh._positions[0] = [];
				this._mesh._indices[0] =[];
				for (var i = 0; i < this._vf.lineSegments.length ; i++) {
					x = this._vf.lineSegments[i].x;
					y = this._vf.lineSegments[i].y;
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
				}
				for (var j = 0; j < this._vf.lineSegments.length-1; j++) {
					this._mesh._indices[0].push(j);
					this._mesh._indices[0].push(j + 1);		
				}
				
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 2;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
				
				Array.forEach(this._parentNodes, function (node) {
                   	node._dirty.positions = true;
                });
			}
        }
    )
);

/* ### Polypoint2D ### */
x3dom.registerNodeType(
    "Polypoint2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.Polypoint2D.superClass.call(this, ctx);

            this.addField_MFVec2f(ctx, 'point', []);
            this.addField_SFBool(ctx, 'lit', false);
			
			var x = this._vf.point[0].x;
			var y = this._vf.point[0].y;
         	
			var geoCacheID = 'Polypoint2D_'+x+'-'+y;

			if( x3dom.geoCache[geoCacheID] != undefined )
			{
				x3dom.debug.logInfo("Using Polypoint2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			}
			else
			{
				for (var i = 0; i < this._vf.point.length ; i++) {
					x = this._vf.point[i].x;
					y = this._vf.point[i].y;
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
				}	
				
				this._mesh._invalidate = true;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;

				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				this._mesh._positions[0] = [];
				this._mesh._indices[0] =[];
				for (var i = 0; i < this._vf.point.length ; i++) {
					x = this._vf.point[i].x;
					y = this._vf.point[i].y;
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
				}	
				
				this._mesh._invalidate = true;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
				
				Array.forEach(this._parentNodes, function (node) {
                   	node._dirty.positions = true;
                });	
			}
        }
    )
);

/* ### Rectangle2D ### */
x3dom.registerNodeType(
    "Rectangle2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.Rectangle2D.superClass.call(this, ctx);
			
			this.addField_SFVec2f(ctx, 'size', 2, 2);
            this.addField_SFBool(ctx, 'solid', false);
            this.addField_SFBool(ctx, 'lit', true);

            var sx = this._vf.size.x, sy = this._vf.size.y;
         	
			var geoCacheID = 'Rectangle2D_'+sx+'-'+sy;

			if( x3dom.geoCache[geoCacheID] != undefined )
			{
				x3dom.debug.logInfo("Using Rectangle2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			}
			else
			{
				sx /= 2; sy /= 2;

				this._mesh._positions[0] = [
					-sx,-sy, 0.0, -sx, sy, 0.0,  sx, sy, 0.0,  sx,-sy, 0.0
				];
				this._mesh._normals[0] = [
					0,0,1,  0,0,1,   0,0,1,   0,0,1
				];
				this._mesh._texCoords[0] = [
					0,0, 0,1, 1,1, 1,0
				];
				this._mesh._indices[0] = [
					0,1,2, 2,3,0
				];
				this._mesh._invalidate = true;
				this._mesh._numFaces = 2;
				this._mesh._numCoords = 4;

				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				if (fieldName == "size")
                { 
                    var size = this._vf.size;
                	var sx = size.x;
               		var sy = size.y;

                   this._mesh._positions[0] = [
						-sx,-sy, 0.0, -sx, sy, 0.0,  sx, sy, 0.0,  sx,-sy, 0.0
				   ]; 
				   
				   this._mesh._invalidate = true;
				   
				   Array.forEach(this._parentNodes, function (node) {
                        node._dirty.positions = true;
                   });
                }
			}
        }
    )
);

/* ### TriangleSet2D ### */
x3dom.registerNodeType(
    "TriangleSet2D",
    "Geometry2D",
    defineClass(x3dom.nodeTypes.X3DGeometryNode,
        function (ctx) {
            x3dom.nodeTypes.TriangleSet2D.superClass.call(this, ctx);

            this.addField_MFVec2f(ctx, 'vertices', []);
            this.addField_SFBool(ctx, 'solid', false);
            this.addField_SFBool(ctx, 'lit', true);
			
			this.addField_MFVec2f(ctx, 'lineSegments', []);
            this.addField_SFBool(ctx, 'lit', false);
			
			var x = this._vf.vertices[0].x;
			var y = this._vf.vertices[0].y;
         	
			var geoCacheID = 'TriangleSet2D_'+x+'-'+y;

			if( x3dom.geoCache[geoCacheID] != undefined )
			{
				x3dom.debug.logInfo("Using TriangleSet2D from Cache");
				this._mesh = x3dom.geoCache[geoCacheID];
			}
			else
			{
				var minx = this._vf.vertices[0].x;
				var miny = this._vf.vertices[0].y;
				var maxx = this._vf.vertices[0].x;
				var maxy = this._vf.vertices[0].y;
					
				for (var i = 0; i < this._vf.vertices.length ; i++) {
					if(this._vf.vertices[i].x < minx) { minx=this._vf.vertices[i].x }
					if(this._vf.vertices[i].y < miny) { miny=this._vf.vertices[i].y }
					if(this._vf.vertices[i].x > maxx) { maxx=this._vf.vertices[i].x }
					if(this._vf.vertices[i].y > maxy) { maxy=this._vf.vertices[i].y }
				}
				
				for (var i = 0; i < this._vf.vertices.length ; i++) {
					x = this._vf.vertices[i].x;
					y = this._vf.vertices[i].y;
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
					
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(1);
					
					this._mesh._texCoords[0].push((x -minx)/(maxx-minx));
					this._mesh._texCoords[0].push((y -miny)/(maxy-miny));
				}
		
				for (var j = 0; j < this._vf.vertices.length; j++) {
					this._mesh._indices[0].push(j);	
				}
				
				this._mesh._numTexComponents = 2;
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 3;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;

				x3dom.geoCache[geoCacheID] = this._mesh;
			}
        },
        {
            nodeChanged: function() {},
            fieldChanged: function(fieldName) {
				this._mesh._positions[0] = [];
				this._mesh._indices[0] =[];
				this._mesh._normals[0] = [];
				this._mesh._texCoords[0] =[];
				
				var minx = this._vf.vertices[0].x;
				var miny = this._vf.vertices[0].y;
				var maxx = this._vf.vertices[0].x;
				var maxy = this._vf.vertices[0].y;
					
				for (var i = 0; i < this._vf.vertices.length ; i++) {
					if(this._vf.vertices[i].x < minx) { minx=this._vf.vertices[i].x }
					if(this._vf.vertices[i].y < miny) { miny=this._vf.vertices[i].y }
					if(this._vf.vertices[i].x > maxx) { maxx=this._vf.vertices[i].x }
					if(this._vf.vertices[i].y > maxy) { maxy=this._vf.vertices[i].y }
				}
				
				for (var i = 0; i < this._vf.vertices.length ; i++) {
					x = this._vf.vertices[i].x;
					y = this._vf.vertices[i].y;
					this._mesh._positions[0].push(x);
					this._mesh._positions[0].push(y);
					this._mesh._positions[0].push(0.0);
					
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(0);
					this._mesh._normals[0].push(1);
					
					this._mesh._texCoords[0].push((x -minx)/(maxx-minx));
					this._mesh._texCoords[0].push((y -miny)/(maxy-miny));
				}
		
				for (var j = 0; j < this._vf.vertices.length; j++) {
					this._mesh._indices[0].push(j);	
				}
				
				this._mesh._numTexComponents = 2;
				this._mesh._invalidate = true;
				this._mesh._numFaces = this._mesh._indices[0].length / 3;
				this._mesh._numCoords = this._mesh._positions[0].length / 3;
				
				Array.forEach(this._parentNodes, function (node) {
                   	node._dirty.positions = true;
					node._dirty.colors = true;
                });	
			}
        }
    )
);