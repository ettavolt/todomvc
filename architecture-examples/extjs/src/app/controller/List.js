Ext.define('Todo.controller.List', {
	extend: 'Ext.app.Controller',
	stores: ['Tasks'],

	init: function () {
		this.listen({
			component: {
				"todo_list": {
					edit: this.onEdit,
					cellclick: this.onTodoClick
				}
			}
		});
	},

	onTodoClick: function (view, cellEl, cellNum, record, rowEl, rowNum, event) {
		if (event.getTarget('.delete-icon')) {
			this.getTasksStore().remove(record);
		}
		if (event.getTarget('.checkcolumn')) {
			/*var completed = !record.get('completed');
			record.beginEdit();*/
			record.set('completed', !record.get('completed'));
			/*record.endEdit(true);
			record.save();*/
		}
	},
	//In-place label edit.
	onEdit: function (editor, data) {
		var value = Ext.String.trim(data.value);
		if (Ext.isEmpty(value)) {
			this.getTasksStore().remove(data.record);
		} else {
			data.record.set('title', value);
		}
	}
});