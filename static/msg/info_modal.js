$(document).ready(function () {
    $(".btn").filter(".btn-outline-warning").click(function () {
        let name = $(this).attr("name")
        $("textarea").text(`@${name}\n`)
        $(".modal-title").text(`Reply to : ${name}`)
        $("#replyModal").modal("show")
    })

    $(".fab").filter(".reply").click(function () {
        $("textarea").text("")
        $(".modal-title").text("Write some message")
        $("#replyModal").modal("show")
    })
})