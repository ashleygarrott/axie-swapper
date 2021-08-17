<template>
    <div class="dialog" style="position:fixed">
        <div class="mx-2">
            <form action="/action_page.php">
                <label for="fname">Scholar ID:</label><br>
                <input type="text" id="fname" name="fname" value="John"><br>
            </form>
        </div>
        
        <div class="d-flex justify-content-center my-3">
            <div class="d-flex justify-content-center primary-button">
                <div class="mx-5">request axie</div>
            </div>
        </div>
    </div>

</template>

<script>


export default{
    name: "PopUp"
}
</script>

<style>
    .dialog {
        position: fixed;
        left: 500px;
        top:500px;
        border-style: solid;
        border-color: grey;
        border-width: 1px

    }

    .primary-button {
        background-color: green;
        border-radius: 10px
    }
</style>
