$(function () {
    $('#submitNewTask').on('submit', function () {
        let newTask = { task: $('#new_task').val() }
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: newTask,
            success: function (data) { location.reload(); }
        });
        return false;
    });

    $('li.tasks-undone').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/todo/complete',
            data: { task: $(this).text() },
            success: function (data) { location.reload(); }
        });
    });

    $('li.tasks-done').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/todo/reset',
            data: { task: $(this).text() },
            success: function (data) { location.reload(); }
        });
    });
});